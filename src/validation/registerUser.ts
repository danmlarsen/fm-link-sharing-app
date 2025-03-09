import { z } from "zod";
import { passwordValidation } from "./password";

export const registerUserSchema = z
  .object({
    email: z.string().email(),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
