"use client";

import { useState, useEffect } from "react";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/get-seller-orders");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Seller Order History</h1>

      <div className="mt-6">
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div key={order.id} className="border p-4">
                <h2 className="text-lg font-semibold">{order.product.name}</h2>
                <p>Buyer: {order.user.email}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}