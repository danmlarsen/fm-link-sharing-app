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
import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import IconEmail from "@/assets/images/icon-email.svg";
import IconPassword from "@/assets/images/icon-password.svg";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().min(1, "Cant be empty").email(),
  password: z.string().min(8, "Please check again"),
});

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      await auth.loginWithEmailAndPassword(data.email, data.password);
      router.refresh();
    } catch (error: any) {
      toast("Error!", {
        description:
          error.code === "auth/invalid-credential"
            ? "Incorrect credentials"
            : "An error occured",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="space-y-6"
          disabled={form.formState.isSubmitting || !!auth.currentUser}
        >
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
                  <FormMessage className="absolute top-1/2 right-4 hidden -translate-y-1/2 md:block" />
                </div>
                <FormMessage className="md:hidden" />
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
                      placeholder="Enter your password"
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
                  <FormMessage className="absolute top-1/2 right-4 hidden -translate-y-1/2 md:block" />
                </div>
                <FormMessage className="md:hidden" />
              </FormItem>
            )}
          />

          <div className="flex flex-col">
            <Button type="submit">Login</Button>
          </div>

          <div className="flex flex-col">
            {/* TODO: Used for testing auth */}
            {!auth?.currentUser && <ContinueWithGoogleButton />}
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
