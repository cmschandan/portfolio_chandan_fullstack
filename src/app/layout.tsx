import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chandankumar.dev"),
  title: "Chandan Kumar | Senior Full Stack Developer",
  description: "Full Stack Developer with 7 years of experience building scalable web applications using Angular, Node.js, and AWS. Expert in Serverless architectures, clean code, and delivering end-to-end solutions.",
  keywords: ["Full Stack Developer", "React", "Angular", "Node.js", "AWS", "TypeScript", "Next.js", "Serverless"],
  authors: [{ name: "Chandan Kumar" }],
  creator: "Chandan Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chandankumar.dev",
    siteName: "Chandan Kumar Portfolio",
    title: "Chandan Kumar | Senior Full Stack Developer",
    description: "Full Stack Developer with 7 years of experience building scalable web applications",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chandan Kumar - Senior Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Kumar | Senior Full Stack Developer",
    description: "Full Stack Developer with 7 years of experience",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
