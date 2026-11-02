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
  
  if (!settings) {
    return {
      title: "Nitin Singh | AI/ML Student · Full-Stack Developer",
      description: "Portfolio of Nitin Singh, showcasing AI/ML projects, full-stack applications, and interactive 3D experiences.",
    }
  }

  return {
    title: {
      template: `%s | ${settings.title || 'Nitin Singh'}`,
      default: settings.title || "Nitin Singh | AI/ML Student · Full-Stack Developer",
    },
    description: settings.description || "Portfolio of Nitin Singh",
    openGraph: {
      images: settings.og_image ? [settings.og_image] : [],
    },
    icons: {
      icon: settings.favicon || '/favicon.ico',
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
