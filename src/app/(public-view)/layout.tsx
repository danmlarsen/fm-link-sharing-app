import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PublicViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] gap-[60px]">
      {/* TODO: Display only when logged in */}
      <header>
        <Card>
          <CardContent className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/links">Back to Editor</Link>
            </Button>
            <Button>Share Link</Button>
          </CardContent>
        </Card>
      </header>

      <main>{children}</main>
    </div>
  );
}
