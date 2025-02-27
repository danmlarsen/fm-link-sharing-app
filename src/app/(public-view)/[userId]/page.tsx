import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { platforms } from "@/data/platforms";
import Image from "next/image";
import Link from "next/link";

const mockedLinks = [
  {
    platformId: "github",
    url: "https://www.github.com/danmlarsen",
  },
  {
    platformId: "youtube",
    url: "https://www.youtube.com/danmlarsen",
  },
  {
    platformId: "linkedin",
    url: "https://www.linkedin.com/danmlarsen",
  },
];

export default async function UserLinks({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;

  return (
    <Card className="mx-auto max-w-[237px] bg-transparent text-center">
      <CardHeader className="px-0">
        <CardTitle>Dan M. Larsen</CardTitle>
        <CardDescription>mail@danmarius.no</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="space-y-5">
          {mockedLinks.map((link) => (
            <LinkItem key={link.platformId} data={link} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function LinkItem({ data }: { data: { platformId: string; url: string } }) {
  const { platformId, url } = data;

  const platform = platforms.find((platform) => platform.id === platformId)!;

  return (
    <li
      style={{ backgroundColor: platform.color }}
      className="rounded-md text-white"
    >
      <Link className="flex justify-between p-4" href={url} target="_blank">
        <div className="flex gap-2">
          <div className="relative size-6">
            <Image className="" src={platform.icon} alt={platform.title} fill />
          </div>
          <div>{platform?.title}</div>
        </div>
        <div>&rarr;</div>
      </Link>
    </li>
  );
}
