"use server";

import { auth, firestore } from "@/firebase/server";
import { TLink } from "@/types/profile";
import { linksFormSchema } from "@/validation/profile";
import { revalidateTag } from "next/cache";

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

  await firestore.collection("profiles").doc(userId).set(
    {
      links,
    },
    { merge: true },
  );

  revalidateTag("userData");
}
