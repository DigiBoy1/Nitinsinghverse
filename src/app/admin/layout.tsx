export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Admin navigation/sidebar will go here in Phase 4 */}
      <main className="flex-1 flex flex-col p-6">
        {children}
      </main>
    </div>
  );
}
