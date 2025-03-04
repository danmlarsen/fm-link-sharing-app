"use client";

import { useAuth } from "@/context/auth";
import LinksButton from "./links-button";
import ProfileButton from "./profile-button";
import { useRouter } from "next/navigation";

export default function CustomizeNavButtons() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div>
      {!!auth?.currentUser && (
        <>
          <LinksButton />
          <ProfileButton />
        </>
      )}
    </div>
  );
}
