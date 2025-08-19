"use client";

import Navbar from "@/components/Navbar";
import "./styles/globals.css";
import "./styles/darkMode.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen transition-colors duration-300 overflow-x-hidden px-1">
        <ReduxProvider>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Navbar />
              {children}
            </>
          )}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
