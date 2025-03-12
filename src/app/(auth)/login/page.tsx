import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
      </CardContent>
      <CardFooter className="md:px-10">
        <span>Don't have an account?</span>
        <Button variant="ghost" asChild>
          <Link href="/register">Create account</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
