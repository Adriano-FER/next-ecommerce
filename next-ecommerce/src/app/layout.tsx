import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ProductProvider } from "../context/ApiContext";
import Chatbot from "@/components/Chatbot"
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turibue",
  description: "A complete e-commerce application with Next.js and Wix",
  icons: {
    icon: [
      { url: "/logo.png" }  // Asumiendo que tu logo está en la carpeta public
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
            <Navbar />
            {children}
            <Chatbot />
            <Footer />
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
