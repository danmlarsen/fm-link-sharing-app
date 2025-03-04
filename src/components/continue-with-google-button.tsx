"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.refresh();
      }}
    >
      Continue with Google
    </Button>
  );
}
