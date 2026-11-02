import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getPublicResource } from '@/lib/api/publicData'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicResource<any>('site_settings', { single: true })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nitinsinghverse.vercel.app'
  
  const siteTitle = settings?.title || "NITINSINGHVERSE | Nitin Singh — AI/ML & Full-Stack Developer"
  const siteDesc = settings?.description || "Explore NITINSINGHVERSE, the personal portfolio of Nitin Singh showcasing AI/ML projects, full-stack web applications, and interactive 3D experiences."

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${settings?.title || 'NITINSINGHVERSE'}`,
      default: siteTitle,
    },
    description: siteDesc,
    keywords: [
      "nitinsinghverse",
      "nitin singh verse",
      "nitinsingh",
      "Nitin Singh",
      "Nitin Singh Portfolio",
      "Nitin Singh Developer",
      "AI/ML Developer",
      "Full Stack Developer Portfolio",
      "Next.js 3D Portfolio"
    ],
    authors: [{ name: "Nitin Singh", url: "https://github.com/DigiBoy1" }],
    creator: "Nitin Singh",
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: baseUrl,
      siteName: "NITINSINGHVERSE",
      locale: "en_US",
      type: "website",
      images: settings?.og_image ? [{ url: settings.og_image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDesc,
    },
    icons: {
      icon: settings?.favicon || '/favicon.ico',
    },
    alternates: {
      canonical: baseUrl,
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nitinsinghverse.vercel.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nitin Singh',
    alternateName: ['nitinsinghverse', 'NITINSINGHVERSE', 'DigiBoy1'],
    url: baseUrl,
    jobTitle: 'AI/ML Student & Full-Stack Developer',
    description: 'Portfolio of Nitin Singh (NITINSINGHVERSE), showcasing AI/ML projects, full-stack applications, and interactive 3D experiences.',
    sameAs: [
      'https://github.com/DigiBoy1',
    ],
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
