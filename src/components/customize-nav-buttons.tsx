"use client";

import { useAuth } from "@/context/auth";
import LinksButton from "./links-button";
import ProfileButton from "./profile-button";
import ContinueWithGoogleButton from "./continue-with-google-button";
import { Button } from "./ui/button";

export default function CustomizeNavButtons() {
  const auth = useAuth();

  return (
    <div>
      {!!auth?.currentUser && (
        <>
          <LinksButton />
          <ProfileButton />

          {/* TODO: Used for testing auth */}
          <Button
            onClick={async () => {
              await auth.logout();
            }}
          >
            Logout
          </Button>
        </>
      )}
      {/* TODO: Used for testing auth */}
      {!auth?.currentUser && <ContinueWithGoogleButton />}
    </div>
  );
}
