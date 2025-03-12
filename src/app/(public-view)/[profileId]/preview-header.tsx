"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import IconLinkCopied from "@/assets/images/icon-link-copied-to-clipboard.svg";
import Image from "next/image";

export default function PreviewHeader() {
  const auth = useAuth();
  const { profileId } = useParams();

  const userId = auth.currentUser?.uid;

  async function handleShareLink() {
    const url = new URL(window.location.href);
    url.search = "";

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url.toString());
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url.toString();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast(
        <div className="flex items-center gap-2.5">
          <Image src={IconLinkCopied} alt="Link copied icon" />
          <span>The link has been copied to your clipboard!</span>
        </div>,
      );
    } catch (error: any) {
      toast.error("Failed to copy link to clipboard", {
        description: error?.message ?? "An error occured",
      });
    }
  }

  if (!!auth?.currentUser && profileId === userId)
    return (
      <header className="md:px-6 md:py-6">
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
