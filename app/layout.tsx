import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The metadata for the application.
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Wordle Solver",
  description: "A simple and effective interface for solving Wordle puzzles.",
};

/**
 * The root layout for the application.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the component.
 * @returns {JSX.Element} The rendered layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
