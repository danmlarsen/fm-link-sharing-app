"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import PreviewIcon from "@/assets/images/icon-preview-header.svg";
import Image from "next/image";
import { useAuth } from "@/context/auth";

export default function PreviewButton() {
  const auth = useAuth();

  return (
    <Button variant="outline" asChild className="text-primary font-semibold">
      <Link href={`/${auth.currentUser?.uid}`}>
        <Image className="md:hidden" src={PreviewIcon} alt="Preview icon" />
        <span className="hidden md:inline">Preview</span>
      </Link>
    </Button>
  );
}
