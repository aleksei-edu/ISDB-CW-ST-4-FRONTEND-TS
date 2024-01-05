import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(100, { message: "Password must be less than 100 characters" });

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must contain at least 3 characters" })
      .max(20, { message: "Username must be less than 20 characters" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  password: passwordSchema,
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export type Product = {
  id: number;
  name: string;
  nationalNum: number;
  pokemonImageLink: string;
  types: string[];
  price: number;
  quantity: string;
};
