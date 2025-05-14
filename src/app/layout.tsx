import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';  // Bootstrap Icons CSS
import "./globals.css";

export const metadata = {
  title: "Cantine",
  description: "Cantine - Plateforme de gestion de cantine",
  keywords: ["Cantine", "Plateforme de gestion de cantine", "Gestion de cantine", "Cantine - Plateforme de gestion de cantine"],
  authors: [
    {
      name: "Cantine",
      url: "https://cantine.com",
    },
  ],
  publisher: "Cantine",
  creator: "Cantine",
  openGraph: {
    title: "Cantine",
    description: "Cantine - Plateforme de gestion de cantine",
    type: "website",
    locale: "fr_FR",
    siteName: "Cantine",
    url: "https://cantine.com",
  },
  twitter: {
    title: "Cantine",
    description: "Cantine - Plateforme de gestion de cantine",
    card: "summary_large_image",
    site: "@Cantine",
    creator: "@Cantine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="fr">
      <body id="root">
        {children}
      </body>
    </html>
  );
}
