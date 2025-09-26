import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password length must be greater than 6" }),
});

export default loginSchema;
