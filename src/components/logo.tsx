"use client";

import Image from "next/image";
import IconLogo from "@/assets/images/logo-devlinks-large.svg";
import IconLogoSmall from "@/assets/images/logo-devlinks-small.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useAuth } from "@/context/auth";

export default function Logo({
  forceFullLogo = false,
}: {
  forceFullLogo?: boolean;
}) {
  const auth = useAuth();

  if (auth.currentUser) {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <LogoIcon forceFullLogo={forceFullLogo} />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>{auth.currentUser?.email}</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Link href="/logout">Logout</Link>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  } else {
    return <LogoIcon forceFullLogo={forceFullLogo} />;
  }
}

function LogoIcon({ forceFullLogo = false }: { forceFullLogo?: boolean }) {
  return (
    <>
      <Image
        className={cn("md:hidden", forceFullLogo && "hidden")}
        src={IconLogoSmall}
        alt="Logo"
      />
      <Image
        className={cn("hidden md:block", forceFullLogo && "block")}
        src={IconLogo}
        alt="Logo"
      />
    </>
  );
}
