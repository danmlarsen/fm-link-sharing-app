import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getCachedProfile } from "@/data/profile";

import { notFound } from "next/navigation";

import PlatformLinkItem from "@/components/PlatformLinkItem";

export const dynamic = "force-static";

export default async function UserLinks({ params }: { params: Promise<any> }) {
  const { profileId } = await params;

  if (!profileId) notFound();

  const { data: profileData } = await getCachedProfile(profileId);

  if (!profileData) notFound();

  const firstName = profileData?.firstName || "John";
  const lastName = profileData?.lastName || "Apple";
  const links = profileData?.links || [];

  return (
    <Card className="md:bg-background mx-auto max-w-[14.8125rem] gap-0 bg-transparent text-center md:max-w-lg md:min-w-[21.8125rem] md:px-14 md:py-12 md:shadow-[0_0_32px_0] md:shadow-black/10">
      <CardHeader className="gap-0 px-0">
        <div className="flex justify-center">
          <Avatar className="border-primary size-[6.75rem] border-4">
            <AvatarImage
              src={profileData?.avatar}
              alt={`${firstName} ${lastName} profile image`}
            />
            <AvatarFallback>
              {`${firstName.at(0)?.toUpperCase()} ${lastName.at(0)?.toUpperCase()}`}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="mt-6 text-[2rem] leading-relaxed break-all">
          {firstName} {lastName}
        </CardTitle>
        {!!profileData?.email && (
          <CardDescription className="mt-2 text-base">
            {profileData.email}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="mt-14 px-0">
        <ul className="space-y-5">
          {links.map((link) => (
            <PlatformLinkItem
              key={link.platform}
              data={link}
              className="h-14"
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
