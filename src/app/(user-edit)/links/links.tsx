"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PhoneMockup from "@/components/ui/phone-mockup";
import LinksForm from "./links-form";
import { TProfile } from "@/types/profile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { linksFormSchema } from "@/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Links({
  profileData,
}: {
  profileData: TProfile | null;
}) {
  const form = useForm<z.infer<typeof linksFormSchema>>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: {
      links: profileData?.links || [],
    },
  });

  const phoneMockupData = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    avatar: profileData?.avatar || "",
    email: profileData?.email || "",
    links: form.getValues("links"),
  };

  form.watch("links");

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 lg:grid-cols-[auto_1fr]">
      <aside className="hidden w-[400px] lg:grid">
        <Card>
          <CardContent>
            <PhoneMockup data={phoneMockupData} />
          </CardContent>
        </Card>
      </aside>
      <main className="grid">
        <div className="mx-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle>Customize your links</CardTitle>
              <CardDescription>
                Add/edit/remove links below and then share all your profiles
                with the world!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinksForm form={form} />
            </CardContent>
            {/* <CardFooter className="items-stretch">
        <Button>Save</Button>
      </CardFooter> */}
          </Card>
        </div>
      </main>
    </div>
  );
}
