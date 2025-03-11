"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import {
  profileDetailsFormSchema,
  profilePictureSchema,
} from "@/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveProfileDetails, uploadProfilePicture } from "./actions";
import { TProfile } from "@/types/profile";
import ProfileImageUploader, { TImageUpload } from "./profile-image-uploader";
import { toast } from "sonner";
import Image from "next/image";

import IconSaved from "@/assets/images/icon-changes-saved.svg";

const formSchema = profileDetailsFormSchema.and(profilePictureSchema);

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

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="bg-accent">
          <CardContent>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>Profile picture</FormLabel>
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <FormControl>
                      <ProfileImageUploader
                        image={field.value}
                        onImageChange={(image: TImageUpload) => {
                          form.setValue("avatar", image);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-accent">
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>First name*</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>Last name*</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col px-6">
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  );
}
