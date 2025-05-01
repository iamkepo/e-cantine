"use client";
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper.js)
import 'bootstrap-icons/font/bootstrap-icons.css';  // Bootstrap Icons CSS

import "./globals.css";
import ModalComponent from "@/components/ModalComponent";
import ToastComponent from "@/components/ToastComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body id="root">
        {children}
        <ModalComponent />
        <ToastComponent />
      </body>
    </html>
  );
}
