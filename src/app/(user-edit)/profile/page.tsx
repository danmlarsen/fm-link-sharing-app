import { getCachedProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import ProfileDetails from "./profile-details";
import { unauthorized } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile details",
};

export default async function ProfileDetailsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) unauthorized();

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) unauthorized();
  const userId = verifiedToken.uid;

  const { data: profileData } = await getCachedProfile(userId);

  return <ProfileDetails profileData={profileData} />;
}
