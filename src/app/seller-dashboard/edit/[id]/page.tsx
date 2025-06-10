"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditListing({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", description: "", price: "", inventory: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/get-product?id=${params.id}`);
      const data = await res.json();
      setFormData(data);
    };
    fetchProduct();
  }, [params.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/update-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id, ...formData }),
    });
    const data = await res.json();
    router.push("/seller-dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="inventory" value={formData.inventory} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-yellow-500 text-white p-2">Update Listing</button>
      </form>
    </div>
  );
}
