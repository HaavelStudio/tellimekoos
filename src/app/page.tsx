"use client"; // Ensure this is a client component

import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [apiResult, setApiResult] = useState(null);

  const callApi = async () => {
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        credentials: "include", // Ensures authentication cookies are sent
      });
      const data = await res.json();
      setApiResult(data); // Store API response
    } catch (error) {
      console.error("Error calling API:", error);
      setApiResult({ error: "Failed to reach API" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">First App</h1>
          <nav>
            <SignedOut>
              <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold">Welcome to First App</h2>
        <p>This is your home page.</p>

        <SignedIn>
          {/* Button to test API call */}
          <button
            onClick={callApi}
            className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Test Create-User API
          </button>
          {/* Display API response */}
          {apiResult && (
            <pre className="mt-4 p-2 bg-gray-200 border">{JSON.stringify(apiResult, null, 2)}</pre>
          )}
        </SignedIn>
      </main>
    </div>
  );
}
