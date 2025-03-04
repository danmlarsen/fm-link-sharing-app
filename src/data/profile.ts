import { firestore } from "@/firebase/server";
import { TProfile } from "@/types/profile";

export async function getProfile(userId: string) {
  const profileSnapshot = await firestore
    .collection("profiles")
    .doc(userId)
    .get();

  if (!profileSnapshot.exists) return { data: null };

  return {
    data: { id: profileSnapshot.id, ...profileSnapshot.data() } as TProfile,
  };
}
