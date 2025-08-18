import z from "zod";

const loginUserSchema = z.object({
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Passwor dis required")
    .min(6, "password length must be greater than 6"),
});

const registerUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password length must be greater than 6"),
});

export { loginUserSchema, registerUserSchema };
