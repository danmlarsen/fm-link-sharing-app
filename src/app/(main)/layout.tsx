import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] gap-4">
      <header>
        <Card className="rounded-t-none">
          <CardContent className="flex justify-between">
            <div>logo</div>
            <div>
              <Link href="/links">Customize Links</Link>
              <Link href="/profile">Profile details</Link>
            </div>
            <div>preview</div>
          </CardContent>
        </Card>
      </header>

      <div className="grid md:grid-cols-[auto_1fr]">
        <aside className="hidden md:block">aside</aside>
        <main className="grid px-4">
          <Card className="grid">
            <CardContent>{children}</CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
