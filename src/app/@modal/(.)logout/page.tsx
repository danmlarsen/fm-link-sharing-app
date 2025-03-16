"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";

export default function LogoutModal() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function logout() {
      setShowModal(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        await auth.logout();
      } catch (e) {}

      setShowModal(false);
      // Can't get this to work with router.push()
      location.reload();
    }
    logout();
  }, []);

  return (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Logging out...</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
