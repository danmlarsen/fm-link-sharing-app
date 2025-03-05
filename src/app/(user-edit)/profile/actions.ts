"use server";

import { auth, firestore } from "@/firebase/server";
import { cloudinary } from "@/lib/cloudinary";
import { TProfileDetails } from "@/types/profile";
import { profileDetailsFormSchema } from "@/validation/profile";
import { UploadApiErrorResponse } from "cloudinary";

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

  const { avatar, ...rest } = data;

  let avatarPath = "";
  if (!!avatar?.file) {
    const bytes = await avatar.file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(buffer);
    });
    avatarPath = uploadResult?.secure_url ?? "";
  }

  const newData = { ...rest, avatar: avatarPath };

  firestore
    .collection("profiles")
    .doc(userId)
    .set(
      {
        ...newData,
      },
      { merge: true },
    );
}
