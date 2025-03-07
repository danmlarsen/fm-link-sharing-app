import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { platforms } from "@/data/platforms";
import { getProfile } from "@/data/profile";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserLinks({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;

  const { data: profileData } = await getProfile(profileId);

  if (!profileData) return notFound();

  return (
    <Card className="mx-auto max-w-[237px] bg-transparent text-center">
      <CardHeader className="px-0">
        <div className="flex justify-center">
          <Avatar className="size-28">
            <AvatarImage
              src={profileData.avatar}
              alt={`${profileData.firstName} ${profileData.lastName} profile image`}
            />
            <AvatarFallback>
              {profileData.firstName.at(0) + profileData.lastName.at(0)!}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>
          {profileData.firstName} {profileData.lastName}
        </CardTitle>
        <CardDescription>{profileData.email}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="space-y-5">
          {profileData.links.map((link) => (
            <LinkItem key={link.platform} data={link} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function LinkItem({ data }: { data: { platform: string; url: string } }) {
  const { platform, url } = data;

  const platformData = platforms.find((item) => item.id === platform)!;

  const Icon = platformData.icon;

  return (
    <li
      style={{ backgroundColor: platformData.color }}
      className="rounded-md text-white"
    >
      <Link className="flex justify-between p-4" href={url} target="_blank">
        <div className="flex gap-2">
          <div className="relative flex size-6 items-center">
            <Icon className="size-5 text-white" />
          </div>
          <div>{platformData?.title}</div>
        </div>
        <div>&rarr;</div>
      </Link>
    </li>
  );
}
