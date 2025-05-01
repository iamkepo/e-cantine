"use client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';  // Bootstrap Icons CSS
import "./globals.css";
import { useEffect } from "react";
import { useLangStore } from "@/stores/langStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = useLangStore();
  const router = useRouter();
  const route = usePathname();
    useEffect(() => {    
      if (route == "/") {
        router.push("/"+lang)
      }
    }, [lang, router, route]);
  return (
    <html lang={lang}>
      <body id="root">
        {children}
      </body>
    </html>
  );
}
