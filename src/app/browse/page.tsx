"use client";

import { useEffect, useState } from "react";

export default function BrowseListings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/get-all-products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Browse Listings</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Current Price: ${product.currentPrice.toFixed(2)}</p>
            <p>Inventory Left: {product.inventory}</p>
            <button
              className="mt-2 bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
              onClick={() => window.location.href = `/browse/${product.slug}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
