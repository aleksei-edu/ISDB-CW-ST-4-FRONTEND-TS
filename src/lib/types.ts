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

export const TrainerFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name must contain at least 1 characters" }),
  lastName: z.string().min(1, { message: "Last name must contain at least 1 characters" }),
  gender: z.enum(["MALE", "FEMALE"]),
  level: z.number().min(1, { message: "Level must be at least 1" }).max(100, { message: "Level must be less than 100" }),
  physicalSweeper: z.number().min(0, { message: "Physical Sweeper must be at least 0" }).max(100, { message: "Physical Sweeper must be less than 100" }),
  specialSweeper: z.number().min(0, { message: "Special Sweeper must be at least 0" }).max(100, { message: "Special Sweeper must be less than 100" }),
  wall: z.number().min(0, { message: "Wall must be at least 0" }).max(100, { message: "Wall must be less than 100" }),
  physicalTank: z.number().min(0, { message: "Physical Tank must be at least 0" }).max(100, { message: "Physical Tank must be less than 100" }),
  specialTank: z.number().min(0, { message: "Special Tank must be at least 0" }).max(100, { message: "Special Tank must be less than 100" }),
}).refine((data) => {
  const total = data.physicalSweeper + data.specialSweeper + data.wall + data.physicalTank + data.specialTank;
  return total === 100;
}, {
  message: "You must distribute all points",
  path: ["specialTank"],
});

export type TrainerFormValues = z.infer<typeof TrainerFormSchema>;

export type Product = {
  id: number;
  name: string;
  nationalNum: number;
  pokemonImageLink: string;
  types: string[];
  price: number;
  quantity: string;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type TrainerInfo = {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  level: number;
  physicalSweeper: number;
  specialSweeper: number;
  wall: number;
  physicalTank: number;
  specialTank: number;
}

export type UserInfo = {
  username: string;
  avatar: string | null;
  trainer: TrainerInfo | null;
}
