import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Card className="md:py-10">
      <CardHeader className="md:px-10">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Add your details below to get back into the app
        </CardDescription>
      </CardHeader>
      <CardContent className="md:px-10">
        <LoginForm />
        <div className="mt-6 flex flex-col items-center justify-center px-6 md:flex-row md:gap-2 md:px-10">
          <span>Don&apos;t have an account?</span>
          <Button variant="ghost" asChild className="px-0 font-normal">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
