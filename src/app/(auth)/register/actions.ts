"use server";

import { auth } from "@/firebase/server";
import { registerUserSchema } from "@/validation/registerUser";

export async function registerUser(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues.at(0)?.message ?? "An error occured",
    };
  }

  try {
    await auth.createUser({
      email: data.email,
      password: data.password,
    });
  } catch (e: any) {
    return {
      error: true,
      message: e.message ?? "Could not register user",
    };
  }
}
