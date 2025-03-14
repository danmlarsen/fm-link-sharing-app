"use client";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserSchema } from "@/validation/registerUser";
import { registerUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import IconEmail from "@/assets/images/icon-email.svg";
import IconPassword from "@/assets/images/icon-password.svg";
import Image from "next/image";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof registerUserSchema>) {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast.error("Error", { description: response.message });
      return;
    }

    toast.success("Success", {
      description: "Your account was created successfully!",
    });
    router.push("/login");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="e.g. alex@email.com"
                    type="email"
                    {...field}
                    className="pl-10"
                  />
                </FormControl>
                <Image
                  src={IconEmail}
                  alt="Email icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2"
                />
                <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="At least 8 characters"
                    type="password"
                    {...field}
                    className="pl-10"
                  />
                </FormControl>
                <Image
                  src={IconPassword}
                  alt="Lock icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2"
                />
                <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="At least 8 characters"
                    type="password"
                    {...field}
                    className="pl-10"
                  />
                </FormControl>
                <Image
                  src={IconPassword}
                  alt="Lock icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2"
                />
                <FormMessage className="absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col">
          <Button type="submit">Create new account</Button>
        </div>
      </form>
    </Form>
  );
}
