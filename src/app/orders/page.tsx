"use client";

import { useState, useEffect } from "react";

interface Product {
  name: string;
}

interface Order {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]); // ✅ Define `orders` as an array of `Order`

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/get-orders");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setOrders(data as Order[]);
      } else {
        console.error("Expected an array of orders but got:", data);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Order History</h1>

      <div className="mt-6">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div key={order.id} className="border p-4">
                <h2 className="text-lg font-semibold">{order.product.name}</h2>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                <p>Purchased on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}