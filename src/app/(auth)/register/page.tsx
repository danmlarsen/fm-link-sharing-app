import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <Card className="md:py-10">
      <CardHeader className="md:px-10">
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Let's get your started sharing your links!
        </CardDescription>
      </CardHeader>
      <CardContent className="md:px-10">
        <RegisterForm />
      </CardContent>
      <CardFooter className="md:px-10">
        <span>Already have an account?</span>
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
