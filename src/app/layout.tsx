import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "../components/Toaster/ToastProvider";
import { AuthProvider } from "../context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "../components/TopBar/Header";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "One Stop for all Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" h-full antialiased">
      <body className="min-h-full">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <Header />
            {children}
            <ToastProvider />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
