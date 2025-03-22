import { platforms } from "@/data/platforms";
import Link from "next/link";

import IconArrowRight from "@/assets/images/icon-arrow-right.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PlatformLinkItem({
  className,
  data,
  disabled = false,
}: {
  className?: string;
  data: { platform: string; url?: string };
  disabled?: boolean;
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
        "flex flex-col justify-center rounded-md transition-opacity duration-300 hover:opacity-75",
        disabled && "transition-none hover:opacity-100",
        className,
        platformData.id === "fm" && "border border-gray-500",
      )}
    >
      <Link
        className={cn(
          "flex h-11 items-center justify-between px-4",
          disabled && "pointer-events-none",
        )}
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
