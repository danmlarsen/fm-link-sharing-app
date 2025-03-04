import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileDetails from "./profile-details";
import { getProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";

export default async function ProfileDetailsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value!;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return <p>Not authorized!</p>;
  const userId = verifiedToken.uid;

  const { data: profileData } = await getProfile(userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileDetails profileData={profileData} />
      </CardContent>
    </Card>
  );
}
