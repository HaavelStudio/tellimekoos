"use client"; // Mark this as a client component

import { useAuth } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}
