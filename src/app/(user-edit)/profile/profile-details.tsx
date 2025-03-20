"use client";

import { TProfile } from "@/types/profile";
import {
  profileDetailsFormSchema,
  profilePictureSchema,
} from "@/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileDetailsForm from "./profile-details-form";
import { useAuth } from "@/context/auth";
import { saveProfileDetails, uploadProfilePicture } from "./actions";
import { toast } from "sonner";
import Image from "next/image";

import IconSaved from "@/assets/images/icon-changes-saved.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PhoneMockup from "@/components/ui/phone-mockup";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export const formSchema = profileDetailsFormSchema.and(profilePictureSchema);

export default function ProfileDetails({
  profileData,
}: {
  profileData: TProfile | null;
}) {
  const auth = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: !!profileData?.avatar
        ? { id: profileData.id, url: profileData.avatar }
        : undefined,
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      email: profileData?.email || "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    let avatarPath = data.avatar?.url ?? "";
    if (!!data.avatar?.file) {
      const uploadResponse = await uploadProfilePicture(
        { data: data.avatar.file },
        token,
      );

      if (!!uploadResponse.error) {
        toast.error("Error", { description: uploadResponse.message });
        return;
      }

      avatarPath = uploadResponse?.url ?? "";
      form.setValue("avatar.file", undefined);
    }

    const newData = {
      ...data,
      avatar: avatarPath,
    };

    const response = await saveProfileDetails({
      data: newData,
      token,
    });

    if (!!response?.error) {
      toast.error("Error!", { description: response.message });
      return;
    }

    toast(
      <div className="flex items-center gap-2.5">
        <Image src={IconSaved} alt="Saved icon" />
        <span>Your changes have been successfully saved!</span>
      </div>,
    );
  }

  const phoneMockupData = {
    firstName: form.getValues("firstName"),
    lastName: form.getValues("lastName"),
    avatar: form.getValues("avatar.url"),
    email: form.getValues("email"),
    links: profileData?.links || [],
  };

  form.watch(["firstName", "lastName", "email", "avatar"]);

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
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>
                  Add your details to create a personal touch to your profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileDetailsForm form={form} />
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
