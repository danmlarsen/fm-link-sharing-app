import { getProfile } from "@/data/profile";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import Links from "./links";

export default async function CustomizeLinksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value!;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) return <p>Not authorized!</p>;
  const userId = verifiedToken.uid;

  const { data: profileData } = await getProfile(userId);

  return <Links profileData={profileData} />;
}
