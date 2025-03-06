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

      if (!uploadResponse.error && uploadResponse.url) {
        avatarPath = uploadResponse.url;
      }
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
      console.log("Error!", response.message);
      return;
    }
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
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
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
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
