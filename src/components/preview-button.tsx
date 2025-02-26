import Link from "next/link";
import { Button } from "./ui/button";

import PreviewIcon from "@/assets/images/icon-preview-header.svg";
import Image from "next/image";

export default function PreviewButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="/preview">
        <Image src={PreviewIcon} alt="Preview icon" />
      </Link>
    </Button>
  );
}
