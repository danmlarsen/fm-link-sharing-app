"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PreviewHeader() {
  const auth = useAuth();
  const { profileId } = useParams();

  const userId = auth.currentUser?.uid;

  if (!!auth?.currentUser && profileId === userId)
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
