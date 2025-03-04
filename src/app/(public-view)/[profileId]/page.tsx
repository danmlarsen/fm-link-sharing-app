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

  return (
    <li
      style={{ backgroundColor: platformData.color }}
      className="rounded-md text-white"
    >
      <Link className="flex justify-between p-4" href={url} target="_blank">
        <div className="flex gap-2">
          <div className="relative size-6">
            <Image
              className="fill-white"
              src={platformData.icon}
              alt={platformData.title}
              fill
            />
          </div>
          <div>{platformData?.title}</div>
        </div>
        <div>&rarr;</div>
      </Link>
    </li>
  );
}
