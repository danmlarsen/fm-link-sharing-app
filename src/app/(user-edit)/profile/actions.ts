"use server";

import { auth, firestore } from "@/firebase/server";
import { cloudinary } from "@/lib/cloudinary";
import { TProfileDetails } from "@/types/profile";
import { profileDetailsFormSchema } from "@/validation/profile";
import { UploadApiResponse } from "cloudinary";
import sharp from "sharp";

export async function uploadProfilePicture(
  { data }: { data: File },
  token: string,
) {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const userId = verifiedToken.uid;

  try {
    const bytes = await data.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const metadata = await sharp(buffer).metadata();

    // Validate file type
    if (!["jpeg", "png"].includes(metadata.format || "")) {
      throw new Error("Profile picture is an invalid file type");
    }

    // Validate resolution
    if (metadata.width! > 1024 || metadata.height! > 1024) {
      throw new Error("Profile picture resolution exceeds 1024x1024");
    }

    const uploadResult: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: process.env.CLOUDINARY_IMAGE_FOLDER,
              use_filename: true,
              filename_override: userId,
              unique_filename: false,
              overwrite: true,
            },
            (error, uploadResult) => {
              if (!!error) reject(error.message);

              return resolve(uploadResult);
            },
          )
          .end(buffer);
      },
    );

    if (!uploadResult?.secure_url) {
      return {
        error: true,
        message: "An error occured when uploading profile image",
      };
    }

    return {
      url: uploadResult?.secure_url,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.message ?? "An error occured",
    };
  }
}

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
