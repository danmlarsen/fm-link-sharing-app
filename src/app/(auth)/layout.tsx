import Logo from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen p-8 md:place-items-center">
      <div className="w-full space-y-12 md:max-w-[476px]">
        <div className="flex md:justify-center">
          <Logo forceFullLogo={true} />
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
