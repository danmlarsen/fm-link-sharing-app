import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinksForm from "./links-form";

export default function CustomizeLinksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize your links</CardTitle>
        <CardDescription>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LinksForm />
      </CardContent>
      {/* <CardFooter className="items-stretch">
        <Button>Save</Button>
      </CardFooter> */}
    </Card>
  );
}
