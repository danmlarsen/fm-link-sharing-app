"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import ProfileIcon from "@/assets/images/icon-profile-details-header.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ProfileButton() {
  const pathname = usePathname();

  return (
    <Button
      className={cn("", pathname.startsWith("/profile") && "bg-muted")}
      variant="ghost"
      asChild
    >
      <Link href="/profile">
        <Image src={ProfileIcon} alt="Profile icon" />
      </Link>
    </Button>
  );
}
