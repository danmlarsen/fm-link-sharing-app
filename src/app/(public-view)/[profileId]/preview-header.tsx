"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import Link from "next/link";

export default function PreviewHeader() {
  const auth = useAuth();

  if (!!auth?.currentUser)
    return (
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
    );

  return <div />;
}
