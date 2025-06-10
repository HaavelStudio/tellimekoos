"use client";

import { useUser } from "@clerk/nextjs";

export default function DebugUser() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <p>Loading...</p>;
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
