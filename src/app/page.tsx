import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto p-4">
          <h2 className="text-2xl font-semibold">Welcome to First App</h2>
          <p>Find products, track orders, and manage listings!</p>
          {children} {/* 🔥 This ensures pages inside the app render correctly */}
        </main>
      </div>
    </ClerkProvider>
  );
}
