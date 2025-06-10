"use client";

import { useState, useEffect } from "react";

export default function AccountSettings() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      const res = await fetch("/api/get-user");
      const data = await res.json();
      setRole(data.role);
    };
    fetchUserRole();
  }, []);

  const switchRole = async () => {
    const newRole = role === "buyer" ? "seller" : "buyer";
    const res = await fetch("/api/switch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newRole }),
    });
    const data = await res.json();
    if (data.message) setRole(newRole);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Account Settings</h2>
      <p>Current Role: {role}</p>
      <button
        onClick={switchRole}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Switch to {role === "buyer" ? "Seller" : "Buyer"} Mode
      </button>
    </div>
  );
}
