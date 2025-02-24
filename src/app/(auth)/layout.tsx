import Logo from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen p-8 md:place-items-center">
      <div className="space-y-12">
        <div className="flex md:justify-center">
          <Logo />
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
