"use client";

import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/get-seller-products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.location.href = "/seller-dashboard/new-listing"}
      >
        Add New Listing
      </button>

      <div className="mt-6">
        {products.length === 0 ? (
          <p>No listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.currentPrice.toFixed(2)}</p>
                <p>Inventory Left: {product.inventory}</p>
                <button
                  className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded"
                  onClick={() => window.location.href = `/seller-dashboard/edit/${product.id}`}
                >
                  Edit
                </button>
                <button
                  className="mt-2 ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
