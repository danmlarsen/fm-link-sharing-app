import "server-only";

import { firestore } from "@/firebase/server";
import { TProfile } from "@/types/profile";
import { unstable_cache } from "next/cache";

export const getProfile = unstable_cache(
  async function (userId: string) {
    const profileSnapshot = await firestore
      .collection("profiles")
      .doc(userId)
      .get();

    if (!profileSnapshot.exists) return { data: null };

    return {
      data: { id: profileSnapshot.id, ...profileSnapshot.data() } as TProfile,
    };
  },
  ["user"],
);
