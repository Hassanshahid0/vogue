import React from "react";

const Barber = () => {
    return (
        <div className="bg-gray-100">
            <section className="py-20">
                {/* Shops Section */}
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">Our Shops</h2>
                        <p className="text-lg text-gray-600">
                            Choose from a variety of shops offering different services
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shops.map((shop, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-r hover:text-white text-center"
                      //          onClick={() => window.location.href = '/shop-details'}
                                role="button"
                                aria-label={`View details about ${shop.name}`}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <i className={`fas ${shop.icon} text-primary text-4xl`} aria-hidden="true"></i>
                                </div>
                                <img
                                    alt={shop.alt || 'Shop Image'}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                    src={shop.image}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{shop.name}</h3>
                                <p className="text-gray-600 mb-4">{shop.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
                        <p className="text-lg text-gray-600">
                            Raise your request and let shops accept it or book a specific shop
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {howItWorks.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-r hover:text-white text-center"
                                onClick={() => window.location.href = item.link}
                                role="button"
                                aria-label={`Navigate to ${item.title}`}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <i className={`fas ${item.icon} text-primary text-4xl`} aria-hidden="true"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

          
        </div>
    );
};

// Sample Data for Shops
const shops = [
    {
        name: "Barber Shop 1",
        description: "Professional haircuts and grooming services.",
        image: "https://storage.googleapis.com/a1aa/image/mL352IuUnu7fDSGsbrDnFIKxO5Ol7syuwdLkIZMrxL8Eqp6JA.jpg",
        alt: "Image of a modern barber shop with stylish decor",
        icon: "fa-hand",
    },
    {
        name: "Beauty Salon 1",
        description: "Wide range of beauty treatments and services.",
        image: "https://storage.googleapis.com/a1aa/image/uyqkVGsZOLISCVaQve3HYQfey1MGK5QR3oTNguZtXJwPomqnA.jpg",
        alt: "Image of a modern beauty salon with elegant decor",
        icon: "fa-spa",
    },
    {
        name: "Spa 1",
        description: "Relaxing spa treatments and therapies.",
        image: "https://storage.googleapis.com/a1aa/image/8nrDQdQcFeQhFS6a3C6N0FRk0tWVR2iRfAlj4OGAW6kFUT1TA.jpg",
        alt: "Image of a modern spa with relaxing ambiance",
        icon: "fa-water",
    },
];

// Sample Data for How It Works
const howItWorks = [
    {
        title: "Raise Your Request",
        description: "Submit your service request and let shops know what you need.",
        icon: "fa-hand-paper",
        link: "/MyAppointments1",
    },
    {
        title: "Book a Specific Shop",
        description: "Choose a shop and book your preferred time slot.",
        icon: "fa-calendar-check",
        link: "/Alshopes",
    },
];

// Sample Data for Social Links
const socialLinks = [
    { icon: "fa-facebook-f", href: "#" },
    { icon: "fa-twitter", href: "#" },
    { icon: "fa-instagram", href: "#" },
    { icon: "fa-linkedin-in", href: "#" },
];

export default Barber;
