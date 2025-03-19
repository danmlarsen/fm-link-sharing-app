import { getProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import Links from "./links";
import { unauthorized } from "next/navigation";

export default async function CustomizeLinksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) unauthorized();

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) unauthorized();
  const userId = verifiedToken.uid;

  const { data: profileData } = await getProfile(userId);

  return <Links profileData={profileData} />;
}
