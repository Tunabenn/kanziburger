import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cıss Burger | Teknoloji Konseptli Gurme Burgerci",
  description:
    "Cıss Burger — Yüksek frekanslı lezzet mühendisliği. Odun ateşi ve kızılötesi mühürleme teknolojisiyle hazırlanan yeni nesil gurme burger deneyimi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
