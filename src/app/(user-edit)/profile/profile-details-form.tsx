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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import ProfileImageUploader, { TImageUpload } from "./profile-image-uploader";

import { formSchema } from "./profile-details";

export default function ProfileDetailsForm({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}) {
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
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="e.g. John" {...field} />
                    </FormControl>
                    <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>Last name*</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input placeholder="e.g. Appleseed" {...field} />
                    </FormControl>
                    <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:grid md:grid-cols-[240px_1fr] md:items-center">
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="e.g. email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
                  </div>
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
