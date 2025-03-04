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
import { getProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";

export default async function CustomizeLinksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value!;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return <p>Not authorized!</p>;
  const userId = verifiedToken.uid;

  const { data: profileData } = await getProfile(userId);

  const linksData = profileData?.links || [];

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
        <LinksForm linksData={linksData} />
      </CardContent>
      {/* <CardFooter className="items-stretch">
        <Button>Save</Button>
      </CardFooter> */}
    </Card>
  );
}
