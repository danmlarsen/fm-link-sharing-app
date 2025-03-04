"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import PreviewIcon from "@/assets/images/icon-preview-header.svg";
import Image from "next/image";
import { useAuth } from "@/context/auth";

export default function PreviewButton() {
  const auth = useAuth();

  return (
    <Button variant="outline" asChild>
      <Link href={`/${auth.currentUser?.uid}`}>
        <Image src={PreviewIcon} alt="Preview icon" />
      </Link>
    </Button>
  );
}
