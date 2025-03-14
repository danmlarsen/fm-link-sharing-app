import { platforms } from "@/data/platforms";
import { z } from "zod";

export const linksFormSchema = z.object({
  links: z.array(
    z
      .object({
        platform: z
          .string()
          .refine((value) =>
            platforms.map((platform) => platform.id).includes(value),
          ),
        url: z.string().min(1, "Can't be empty").url("Please check the URL"),
      })
      .superRefine((value, ctx) => {
        const selectedPlatform = platforms.find(
          (platform) => platform.id === value.platform,
        );
        if (!selectedPlatform || !value.url.startsWith(selectedPlatform.url)) {
          ctx.addIssue({
            message: "Please check the URL",
            path: ["url"],
            code: "custom",
          });
        }
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
