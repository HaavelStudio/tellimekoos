"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/get-product?id=${params.id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  const handleCheckout = async () => {
    const res = await fetch("/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: params.id, quantity }),
    });
    const data = await res.json();
    if (data.message) router.push("/orders");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">{product?.name}</h2>
      <p>Price: ${product?.currentPrice.toFixed(2)}</p>
      <p>Inventory Left: {product?.inventory}</p>

      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} max={product?.inventory} className="border p-2 w-full" />
      <button onClick={handleCheckout} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Place Order
      </button>
    </div>
  );
}