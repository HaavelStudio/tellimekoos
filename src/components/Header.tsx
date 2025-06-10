import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; // ✅ Import Clerk authentication components

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">Marketplace</Link>
      
      <nav className="flex space-x-4">
        <Link href="/browse">Browse Listings</Link>
        <Link href="/seller-dashboard">Seller Dashboard</Link>
        <Link href="/orders">Order History</Link>
      </nav>

      {/* ✅ Clerk Authentication */}
      <div>
        <SignedOut>
          <Link href="/sign-in" className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" /> {/* ✅ Displays user avatar & sign-out button */}
        </SignedIn>
      </div>
    </header>
  );
}