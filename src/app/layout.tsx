import { ClerkProvider } from "@clerk/nextjs";
import ClientAuthProvider from "../components/ClientAuthProvider";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ClientAuthProvider>
            {children}
          </ClientAuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
