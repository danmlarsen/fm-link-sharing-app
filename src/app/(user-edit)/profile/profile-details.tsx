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
import { profileDetailsFormSchema } from "@/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveProfileDetails } from "./actions";
import { TProfile } from "@/types/profile";
import ProfileImageUploader, { TImageUpload } from "./profile-image-uploader";

export default function ProfileDetails({
  profileData,
}: {
  profileData: TProfile | null;
}) {
  const auth = useAuth();

  const form = useForm<z.infer<typeof profileDetailsFormSchema>>({
    resolver: zodResolver(profileDetailsFormSchema),
    defaultValues: {
      avatar: undefined,
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      email: profileData?.email || "",
    },
  });

  async function handleSubmit(data: z.infer<typeof profileDetailsFormSchema>) {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await saveProfileDetails({
      data,
      token,
    });

    if (!!response?.error) {
      console.log("Error!", response.message);
      return;
    }

    console.log("Success!");
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
