import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guftagu",
  description: "Anonymous chat for MIET students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AuthProvider>
          <Toaster  
          position="top-center"  
          reverseOrder={false}
                      toastOptions={{
                        className: '',
                        duration: 5000,
                        style: {
                          background: '#334155',  
                          color: '#E2E8F0',
                        },
                        success: {
                          duration: 3000,
                        },
                        error: {
                           duration: 4000,
                        }
                      }}
                    />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}