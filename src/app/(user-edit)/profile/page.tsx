import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import ProfileDetailsForm from "./profile-details-form";
import ProfileDetails from "./profile-details";

export default async function ProfileDetailsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value!;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return <p>Not authorized!</p>;
  const userId = verifiedToken.uid;

  const { data: profileData } = await getProfile(userId);

  return <ProfileDetails profileData={profileData} />;
}
