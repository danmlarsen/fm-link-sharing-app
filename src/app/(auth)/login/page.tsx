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
        <div className="mt-6 flex items-center justify-center gap-2 px-6 md:px-10">
          <span>Don&apos;t have an account?</span>
          <Button variant="ghost" asChild className="px-0">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
