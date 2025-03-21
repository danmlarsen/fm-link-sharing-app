import { cn } from "@/lib/utils";
import { TLink } from "@/types/profile";
import Image from "next/image";
import PlatformLinkItem from "../PlatformLinkItem";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type TMockupData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  links?: TLink[];
};

export default function PhoneMockup({
  className,
  data,
  ...props
}: { data?: TMockupData } & React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="308"
      height="632"
      fill="none"
      viewBox="0 0 308 632"
      className={cn("", className)}
      {...props}
    >
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />

      {!data?.avatar && <circle cx="153.5" cy="112" r="48" fill="#EEE" />}
      {!!data?.avatar && (
        <foreignObject x="105.5" y="64" width={96} height={96}>
          <Avatar className="border-primary size-24 border-4">
            <AvatarImage src={data?.avatar} alt="Profile image" />
          </Avatar>
        </foreignObject>
      )}

      {(!data?.firstName || !data?.lastName) && (
        <>
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
          <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
        </>
      )}
      {!!data?.firstName && !!data?.lastName && (
        <foreignObject width="220" height="80" x="43.5" y="185">
          <div className="text-center">
            <p className="break-all">
              {[data.firstName, data.lastName].join(" ").slice(0, 60)}
            </p>
            {!!data.email && <p>{data.email.slice(0, 30)}</p>}
          </div>
        </foreignObject>
      )}

      {!!data?.links && data.links.length > 0 && (
        <foreignObject x="35" y="270" width="237" height={320}>
          <ul className="space-y-6">
            {data.links.map((link, index) => {
              return <PlatformLinkItem key={index} data={link} />;
            })}
          </ul>
        </foreignObject>
      )}

      {Array.from({ length: Math.max(0, 5 - (data?.links?.length || 0)) }).map(
        (_, index) => {
          const linksAmount = data?.links?.length || 0;
          const yCoords = 278 + 64 * (linksAmount + index);
          return (
            <rect
              key={index}
              width="237"
              height="44"
              x="35"
              y={yCoords}
              fill="#EEE"
              rx="8"
            />
          );
        },
      )}
    </svg>
  );
}
