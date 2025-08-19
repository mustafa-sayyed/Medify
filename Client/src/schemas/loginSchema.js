import z from "zod";

const loginSchema = z.object({
  email: z
  .email({ message: "Invalid email" })
  .nonempty({ message: "Email is required" }),
  
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password length must be greater than 6" }),
});

export default loginSchema;
