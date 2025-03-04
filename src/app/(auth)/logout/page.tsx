"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await auth.logout();
      router.refresh();
    }
    logout();
  }, []);

  return <div>Logging out...</div>;
}
