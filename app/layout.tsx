import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SplashCurtain } from "@/components/motion/splash-curtain";
import { site } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.sinciitd.in";

export const viewport: Viewport = {
  themeColor: "#1a1033",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.fullName}, IIT Delhi`,
    template: `%s | ${site.name} IIT Delhi`,
  },
  description: site.description,
  keywords: [
    "SInC",
    "Student Incubation Cell",
    "IIT Delhi",
    "startup",
    "entrepreneurship",
    "incubation",
  ],
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  openGraph: {
    title: `${site.fullName} — IIT Delhi`,
    description: site.tagline,
    url: siteUrl,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.fullName}, IIT Delhi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — IIT Delhi`,
    description: site.tagline,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <SplashCurtain />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
