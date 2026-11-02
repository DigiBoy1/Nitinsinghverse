import { Navbar } from '@/components/public/layout/Navbar'
import { Footer } from '@/components/public/layout/Footer'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-50 overflow-x-hidden selection:bg-cyan-500/30">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
