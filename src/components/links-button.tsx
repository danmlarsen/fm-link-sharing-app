"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import LinksIcon from "@/assets/images/icon-links-header.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LinksButton() {
  const pathname = usePathname();

  return (
    <Button
      className={cn("", pathname.startsWith("/links") && "bg-muted")}
      variant="ghost"
      asChild
    >
      <Link href="/links">
        <Image src={LinksIcon} alt="Links icon" />
      </Link>
    </Button>
  );
}
