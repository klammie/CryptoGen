"use client";

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import mapSnapshot from "@/public/assets/Screenshot 2025-03-07 142557.png"; // Replace with your map image path

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast.success("Your message has been sent successfully!");
    setForm({ name: "", email: "", message: "" }); // Reset the form
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Contact Us - CryptoTrade</title>
        <meta
          name="description"
          content="Get in touch with CryptoTrade. We'd love to hear from you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Our Location
        </h2>
        <Image
          src={mapSnapshot}
          alt="Map Snapshot"
          layout="responsive"
          width={600}
          height={400}
          className="rounded-md"
        />
        <p className="font-semibold text-black mt-2">
          6 Cork Rd, Carrigaline Middle, Carrigaline, Co. Cork, P43 HW98,
          Ireland
        </p>
        <p className="font-semibold text-black mt-2">
          Contact: +353 818 286 666
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full my-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Toaster richColors position="bottom-left" />
    </div>
  );
};

export default Contact;
