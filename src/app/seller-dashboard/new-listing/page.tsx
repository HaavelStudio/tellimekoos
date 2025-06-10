"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs"; // ✅ Import Clerk authentication helper

export default function NewListing() {
  const { getToken } = useAuth(); // ✅ Retrieve Clerk token for authentication
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(); // 🔥 Get valid Clerk session token

    const res = await fetch("/api/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 🔥 Correctly forward Clerk token
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message || data.error || "Error adding product");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Create New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Product Description" onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="price" placeholder="Price ($)" onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="inventory" placeholder="Inventory Count" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2">Create Listing</button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
}
