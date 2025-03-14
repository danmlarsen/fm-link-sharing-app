import { platforms } from "@/data/platforms";
import Link from "next/link";

import IconArrowRight from "@/assets/images/icon-arrow-right.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PlatformLinkItem({
  className,
  data,
}: {
  className?: string;
  data: { platform: string; url?: string };
}) {
  const { platform, url } = data;

  const platformData = platforms.find((item) => item.id === platform)!;

  const Icon = platformData.icon;

  return (
    <li
      style={{
        backgroundColor: platformData.backgroundColor,
        color: platformData.color,
      }}
      className={cn(
        "flex h-11 flex-col justify-center rounded-md",
        className,
        platformData.id === "fm" && "border border-gray-500",
      )}
    >
      <Link
        className="flex items-center justify-between px-4"
        href={url ?? ""}
        target="_blank"
      >
        <div className="flex gap-2">
          <div className="relative flex size-6 items-center">
            <Icon className="size-5" />
          </div>
          <div>{platformData?.title}</div>
        </div>
        <div>
          <Image src={IconArrowRight} alt="Right arrow icon" />
        </div>
      </Link>
    </li>
  );
}
