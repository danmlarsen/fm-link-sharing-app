"use server";

import { getProfile } from "@/data/profile";
import { auth, firestore } from "@/firebase/server";
import { TLink } from "@/types/profile";
import { linksFormSchema } from "@/validation/profile";

export async function saveLinks({
  links,
  token,
}: {
  links: TLink[];
  token: string;
}) {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const userId = verifiedToken.uid;

  const validation = linksFormSchema.safeParse({ links: links });
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const { data: profile } = await getProfile(userId);

  if (!profile) return;

  await firestore
    .collection("profiles")
    .doc(profile.id)
    .update({ links: links });
}
