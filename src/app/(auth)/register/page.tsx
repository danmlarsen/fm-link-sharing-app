import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <Card className="md:py-10">
      <CardHeader className="md:px-10">
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Let&apos;s get your started sharing your links!
        </CardDescription>
      </CardHeader>
      <CardContent className="md:px-10">
        <RegisterForm />
        <div className="mt-6 flex flex-col items-center justify-center px-6 md:flex-row md:gap-2 md:px-10">
          <span>Already have an account?</span>
          <Button asChild variant="ghost" className="px-0 font-normal">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
