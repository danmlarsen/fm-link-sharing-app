"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/auth";
import { saveLinks } from "./actions";
import { toast } from "sonner";
import Image from "next/image";
import IconSaved from "@/assets/images/icon-changes-saved.svg";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export default function Links({
  profileData,
}: {
  profileData: TProfile | null;
}) {
  const auth = useAuth();
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

  async function handleSubmit(data: z.infer<typeof linksFormSchema>) {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await saveLinks({ links: data.links, token });

    if (!!response?.error) {
      toast.error(response.message);
      return;
    }

    toast(
      <div className="flex items-center gap-2.5">
        <Image src={IconSaved} alt="Saved icon" />
        <span>Your changes have been successfully saved!</span>
      </div>,
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[auto_1fr]">
      <aside className="hidden w-[25rem] lg:grid">
        <Card>
          <CardContent>
            <PhoneMockup data={phoneMockupData} />
          </CardContent>
        </Card>
      </aside>
      <main className="grid">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid">
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
              <CardFooter className="mt-auto items-stretch border-t pt-4 md:items-end md:pt-6">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {!form.formState.isSubmitting && <span>Save</span>}
                  {!!form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
