import { z } from "zod";

export const passwordValidation = z.string().refine(
  (value) => {
    const regex = /^(?=.*\d).{8,}$/;
    return regex.test(value);
  },
  {
    message:
      "Password must be at least 8 characters long and contain at least one digit.",
  },
);
