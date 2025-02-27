import Image from "next/image";
import IconLogo from "@/assets/images/logo-devlinks-large.svg";
import IconLogoSmall from "@/assets/images/logo-devlinks-small.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  forceFullLogo = false,
}: {
  forceFullLogo?: boolean;
}) {
  return (
    <div>
      <Link href="/">
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
      </Link>
    </div>
  );
}
