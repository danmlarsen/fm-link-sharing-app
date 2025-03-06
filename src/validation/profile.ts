import { platforms } from "@/data/platforms";
import { z } from "zod";

export const linksFormSchema = z.object({
  links: z.array(
    z.object({
      platform: z
        .string()
        .refine((value) =>
          platforms.map((platform) => platform.id).includes(value),
        ),
      // TODO: Add URL validation
      url: z.string().min(1, "Can't be empty"),
    }),
  ),
});

export const profileDetailsFormSchema = z.object({
  firstName: z.string().min(1, "Can't be empty"),
  lastName: z.string().min(1, "Can't be empty"),
  email: z.string().optional(),
});

export const profilePictureSchema = z.object({
  avatar: z
    .object({
      id: z.string(),
      url: z.string(),
      file: z.instanceof(File).optional(),
    })
    .optional(),
});
