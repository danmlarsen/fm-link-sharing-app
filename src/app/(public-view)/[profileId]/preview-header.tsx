"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function PreviewHeader() {
  const auth = useAuth();
  const { profileId } = useParams();

  const userId = auth.currentUser?.uid;

  function handleShareLink() {
    const url = new URL(window.location.href);
    url.search = "";
    navigator.clipboard.writeText(url.toString());

    toast(
      <p className="font-semibold">
        The link has been copied to your clipboard!
      </p>,
    );
  }

  if (!!auth?.currentUser && profileId === userId)
    return (
      <header>
        <Card>
          <CardContent className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/links">Back to Editor</Link>
            </Button>
            <Button onClick={handleShareLink}>Share Link</Button>
          </CardContent>
        </Card>
      </header>
    );

  return <div />;
}
