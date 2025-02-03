
const express = require("express");
const { Server } = require("socket.io");
const { Client, LocalAuth } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Session = require("./models/Session");

const app = express();
const server = http.createServer(app);
const port = 3000;

class SessionManager {
    constructor() {
        this.sessions = new Map();
    }

    async createSession(userId, fullName, phoneNumber) {
        const sessionId = uuidv4();
        const client = new Client({
            authStrategy: new LocalAuth({ clientId: sessionId }),
            puppeteer: { 
                headless: true, 
                args: ['--no-sandbox', '--disable-setuid-sandbox'] 
            }
        });

        const sessionData = {
            client,
            qr: null,
            ready: false,
            status: 'initializing',
            userId,
            createdAt: Date.now(),
        };

        this.sessions.set(sessionId, sessionData);

        client.on("qr", async (qr) => {
            sessionData.qr = qr;
            sessionData.status = "qr_pending";
            await updateSessionStatus(sessionId, "qr_pending", qr);
        });

        client.on("ready", async () => {
            sessionData.ready = true;
            sessionData.status = "authenticated";
            sessionData.qr = null;
            await updateSessionStatus(sessionId, "authenticated", null);
        });

        client.on("disconnected", async (reason) => {
            await updateSessionStatus(sessionId, "disconnected", null);
            this.cleanupSession(sessionId);
        });

        await saveSessionToDB(sessionId, userId, fullName, phoneNumber, "initializing");
        await client.initialize();
        return { sessionId };
    }

    cleanupSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.client.destroy();
            this.sessions.delete(sessionId);
        }
    }

    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
}

// Database Helpers
async function saveSessionToDB(sessionId, userId, fullName, phoneNumber, status) {
    const session = new Session({
        sessionId,
        userId,
        fullName,
        phoneNumber,
        status,
        createdAt: new Date(),
    });
    await session.save();
}

async function updateSessionStatus(sessionId, status, qr) {
    await Session.findOneAndUpdate(
        { sessionId },
        { status, qr, updatedAt: new Date() },
        { new: true }
    );
}

// Initialize components
const io = new Server(server, {
    cors: { 
        origin: ["http://localhost:3000", "https://localhost:44355","https://localhost:44328"], 
        methods: ["GET", "POST"] 
    },
    path: "/socket.io"
});
const sessionManager = new SessionManager();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://hassanshaihd:38ZBbqg2zFrzMV2k@cluster0.i9fmg.mongodb.net/test", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("✅ MongoDB Connected"));




// // Routes
app.post("/sessions", async (req, res) => {
    try {

        console.log("✅ Request received:", req.body);

        console.log('done')
        const { UserId, FullName, PhoneNumber } = req.body;
        
        if (!UserId) {
            console.log('false1')
            return res.status(400).json({ error: "Missing required fields" });
            
        }

        if ( !FullName) {
            console.log('false2')
            return res.status(400).json({ error: "Missing required fields" });
            
        }
        if (!PhoneNumber) {
            console.log('false3')
            return res.status(400).json({ error: "Missing required fields" });
            
        }

        const { sessionId } = await sessionManager.createSession(UserId, FullName, PhoneNumber);

        console.log(sessionId)
        
        res.json({ 
            sessionId,
            ws_namespace: `/sessions/${sessionId}`,
            monitor: `http://localhost:${port}/sessions/${sessionId}`
        });
        
        console.log('done1')
         
    } catch (error) {
        res.status(500).json({ error: `Session creation failed: ${error.message}` });
    }
});





app.get("/sessions", async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sessions" });
    }
});

app.get("/sessions/:sessionId", async (req, res) => {
    try {
        const session = await Session.findOne({ sessionId: req.params.sessionId });
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: "Error fetching session" });
    }
});

// Message Sending Endpoints
// Add these routes in your Node.js API
app.post("/sessions/:sessionId/send", async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { PhoneNumber, Message } = req.body;

   
        
        const session = sessionManager.getSession(sessionId);
        if (!session || !session.ready) {
            return res.status(400).json({ error: "Session not ready" });
        }

        const chatId = PhoneNumber.includes("@") ? PhoneNumber : `${PhoneNumber}@c.us`;
        await session.client.sendMessage(chatId, Message);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: `Message send failed: ${error.message}` });
    }
});

app.post("/sessions/:sessionId/send-bulk", async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { messages } = req.body;


        console.log(req.params);  
        console.log(req.body);
        
        const session = sessionManager.getSession(sessionId);
        if (!session || !session.ready) {
            return res.status(400).json({ error: "Session not ready" });
        }

        const results = [];
        for (const { phoneNumber, message } of messages) {
            try {
                const chatId = phoneNumber.includes("@") ? phoneNumber : `${phoneNumber}@c.us`;
                await session.client.sendMessage(chatId, message);
                results.push({ phoneNumber, success: true });
            } catch (error) {
                results.push({ phoneNumber, success: false, error: error.message });
            }
        }
        
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: `Bulk send failed: ${error.message}` });
    }
});





// WebSocket Namespaces
io.of(/^\/sessions\/[a-zA-Z0-9-]+$/).on("connection", (socket) => {
    const sessionId = socket.nsp.name.split("/")[2];
    const session = sessionManager.getSession(sessionId);

    if (!session) {
        socket.disconnect(true);
        return;
    }

    socket.emit("status", { 
        status: session.status, 
        qr: session.qr 
    });

    const forwardEvent = (event, data) => socket.emit(event, data);
    
    session.client.on("qr", (qr) => forwardEvent("qr", qr));
    session.client.on("ready", () => forwardEvent("ready"));
    session.client.on("disconnected", (reason) => forwardEvent("disconnected", reason));

    socket.on("disconnect", () => {
        session.client.removeAllListeners("qr");
        session.client.removeAllListeners("ready");
        session.client.removeAllListeners("disconnected");
    });
});

server.listen(port, () => {
    console.log(`🚀 REST API: http://localhost:${port}`);
    console.log(`⚡ WebSocket: ws://localhost:${port}`);
});
