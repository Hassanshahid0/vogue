import React from "react";

const About = () => {
  return (
    <div className="font-roboto bg-gray-100">
      
     
      {/* Main Section */}
      <main className="container mx-auto p-4">
        {/* About Us Section */}
        <section className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            Welcome to our Barber Shop Platform. We provide an online
            environment where barbers can create and manage their own shops, and
            customers can easily find and book services from their favorite
            barbers.
          </p>
        </section>

        {/* Mission Section */}
        <section className="my-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to empower barbers by providing them with the tools
            and platform they need to create and manage their own online shops.
            We aim to connect barbers with customers, making it easier for them
            to showcase their skills and grow their businesses.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="my-8">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src="https://storage.googleapis.com/a1aa/image/3QTcTegRK9ysVidxfMIt6W18epaASZq3TFsPyEscje4ZCuXPB.jpg"
                alt="Step 1"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold">Step 1: Sign Up</h3>
                <p className="mt-2 text-gray-700">
                  Barbers can easily sign up on our platform using a simple
                  registration form.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src="https://storage.googleapis.com/a1aa/image/3CfNvQ1wxVRBFK5LR1unMrjxay1emfGecOayNEfaSZo9EcveE.jpg"
                alt="Step 2"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold">Step 2: Create Shop Profile</h3>
                <p className="mt-2 text-gray-700">
                  Barbers can create their shop profiles, adding details and
                  photos of their work to attract customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="my-8">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our platform was founded with the vision of creating a space where
            barbers can thrive. We understand the challenges faced by barbers in
            managing their businesses and connecting with customers. Our goal is
            to simplify this process and provide a seamless experience for both
            barbers and customers.
          </p>
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="https://storage.googleapis.com/a1aa/image/LUuHjLGslTJAANzQKIgVrxnjOmisIkLU1U5eU31NaNkUw96JA.jpg"
            alt="Our Story"
          />
        </section>
      </main>

     
    </div>
  );
};

export default About;
