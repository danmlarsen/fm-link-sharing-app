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

        if (!selectedPlatform) {
          ctx.addIssue({
            message: "Please check the URL",
            path: ["url"],
            code: "custom",
          });
          return;
        }

        try {
          const parsedUrl = new URL(value.url);
          if (parsedUrl.protocol !== "https:") throw new Error();
          if (!parsedUrl.hostname.includes(selectedPlatform.hostname))
            throw new Error();
          if (
            !parsedUrl.pathname.includes(selectedPlatform.path) ||
            parsedUrl.pathname.length <= selectedPlatform.path.length
          )
            throw new Error();
        } catch {
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
  firstName: z.string().min(1, "Can't be empty").max(30, "Max 30 characters"),
  lastName: z.string().min(1, "Can't be empty").max(30, "Max 30 characters"),
  email: z.string().max(30, "Max 30 characters").optional(),
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
