"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetails({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); // ✅ Unwrap params first
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!resolvedParams?.slug) return; // ✅ Ensure slug exists before fetching

      const res = await fetch(`/api/get-product?slug=${resolvedParams.slug}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [resolvedParams?.slug]);

  const showInterest = async () => {
    await fetch("/api/show-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productSlug: resolvedParams?.slug }),
    });
    router.refresh();
  };

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>Current Price: ${product?.currentPrice ? product.currentPrice.toFixed(2) : "N/A"}</p>
          <p>Inventory Left: {product.inventory}</p>
          <p>Leads Generated: {product.leadCount}</p>

          <button
            onClick={showInterest}
            className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Interest
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}