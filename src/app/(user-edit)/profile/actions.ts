"use server";

import { auth, firestore } from "@/firebase/server";
import { TProfileDetails } from "@/types/profile";
import { profileDetailsFormSchema } from "@/validation/profile";

export async function saveProfileDetails({
  data,
  token,
}: {
  data: TProfileDetails;
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

  const validation = profileDetailsFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occured",
    };
  }

  firestore
    .collection("profiles")
    .doc(userId)
    .set(
      {
        ...data,
      },
      { merge: true },
    );
}
