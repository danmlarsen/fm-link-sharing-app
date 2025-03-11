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
import Link from "next/link";
import { notFound } from "next/navigation";
import IconArrowRight from "@/assets/images/icon-arrow-right.svg";
import Image from "next/image";

export default async function UserLinks({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;

  const { data: profileData } = await getProfile(profileId);

  if (!profileData) return notFound();

  return (
    <Card className="md:bg-background mx-auto max-w-[237px] gap-0 bg-transparent text-center md:max-w-[349px] md:px-14 md:py-12">
      <CardHeader className="px-0">
        <div className="flex justify-center">
          <Avatar className="border-primary size-[108px] border-4">
            <AvatarImage
              src={profileData.avatar}
              alt={`${profileData.firstName} ${profileData.lastName} profile image`}
            />
            <AvatarFallback>
              {`${profileData.firstName.at(0)?.toUpperCase()} ${profileData.lastName.at(0)?.toUpperCase()}`}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="mt-6 text-3xl leading-relaxed">
          {profileData.firstName} {profileData.lastName}
        </CardTitle>
        <CardDescription>{profileData.email}</CardDescription>
      </CardHeader>
      <CardContent className="mt-14 px-0">
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
      <Link
        className="flex items-center justify-between p-4"
        href={url}
        target="_blank"
      >
        <div className="flex gap-2">
          <div className="relative flex size-6 items-center">
            <Icon className="size-5 text-white" />
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
