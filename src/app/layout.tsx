import { ClerkProvider } from "@clerk/nextjs";
import ClientAuthProvider from "../components/ClientAuthProvider";
import Header from "@/components/Header"; // ✅ Import Header
import Footer from "@/components/Footer"; // ✅ Import Footer
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ClientAuthProvider>
            <Header /> {/* ✅ Ensures header is globally displayed */}
            {children}
            <Footer /> {/* ✅ Ensures footer appears on every page */}
          </ClientAuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}