import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { SearchProvider } from "../context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogzpot",
  description: "A Simple Blog platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-svh`}>
        <ClerkProvider>
          <SearchProvider>
            <Header />
            <main className="flex-grow nunito">
              {children}
            </main>
            <Footer />
          </SearchProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
