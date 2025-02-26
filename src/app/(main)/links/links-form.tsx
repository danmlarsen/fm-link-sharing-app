"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EmptyIllustration from "@/assets/images/illustration-empty.svg";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const platforms = [
  {
    title: "GitHub",
    url: "https://www.github.com",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com",
  },
];

type TLink = {
  selectedPlatform: number;
  url: string;
};

export default function LinksForm() {
  const [links, setLinks] = useState<TLink[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <Button
          variant="outline"
          onClick={() =>
            setLinks((prevLinks) => [
              ...prevLinks,
              { selectedPlatform: 0, url: "" },
            ])
          }
        >
          + Add new link
        </Button>
      </div>

      {links.length === 0 && (
        <Card className="bg-accent">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <Image
                className="w-[124px]"
                src={EmptyIllustration}
                alt="Empty illustration"
              />
            </div>
            <CardTitle>Let's get you started</CardTitle>
            <CardDescription>
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {links.length > 0 && (
        <LinksList
          links={links}
          onRemove={(removeIdx) =>
            setLinks((prevLinks) =>
              prevLinks.filter((_, prevIdx) => prevIdx !== removeIdx),
            )
          }
        />
      )}
    </div>
  );
}

function LinksList({
  links,
  onRemove,
}: {
  links: TLink[];
  onRemove: (idx: number) => void;
}) {
  return (
    <ul className="space-y-6">
      {links.map((link, idx) => (
        <LinksItem
          key={idx}
          link={link}
          linkNum={idx + 1}
          onRemove={() => onRemove(idx)}
        />
      ))}
    </ul>
  );
}

const linkFormSchema = z.object({
  platform: z.string(),
  url: z.string(),
});

function LinksItem({
  link,
  linkNum,
  onRemove,
}: {
  link: TLink;
  linkNum: number;
  onRemove: () => void;
}) {
  const form = useForm<z.infer<typeof linkFormSchema>>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      platform: platforms[link.selectedPlatform].title,
      url: link.url,
    },
  });

  return (
    <li>
      <Card className="bg-accent">
        <CardHeader className="flex-row justify-between">
          <div>Link #{linkNum}</div>
          <div>
            <Button variant="ghost" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem
                            key={platform.title}
                            value={platform.title}
                          >
                            {platform.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`e.g. ${platforms[0].url}/test`}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </li>
  );
}
