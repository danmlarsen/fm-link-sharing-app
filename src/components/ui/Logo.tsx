import Image from "next/image";
import IconLogo from "@/assets/images/logo-devlinks-large.svg";
import IconLogoSmall from "@/assets/images/logo-devlinks-small.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <Image className="md:hidden" src={IconLogoSmall} alt="Logo" />
        <Image className="hidden md:block" src={IconLogo} alt="Logo" />
      </Link>
    </div>
  );
}
