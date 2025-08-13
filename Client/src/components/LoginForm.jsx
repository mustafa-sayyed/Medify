import React, { useEffect, useState } from "react";
import { Button, Input } from "./ui";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password length must be greater than 6" }),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema)});

  const [isFormSubmiting, setIsFormSubmiting] = useState(false);

  useEffect(() => {
    setFocus("email");
  }, []);

  const submitHandler = (data) => {
    setIsFormSubmiting(true);
    setTimeout(() => {
      toast.success("Login Successful");
      toast.error("Invalid Credentials");
    }, 3000);
    console.log(data);
  };

  return (
    <div className="bg-zinc-800/40 sm:px-8 px-6 sm:py-10 py-8 rounded-lg max-w-md w-full border">
      <div className="text-center mb-5 ">
        <h1 className="text-3xl text-center">Login</h1>
        {/* <p className="">Sign in to access your account</p> */}
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col">
        <div className="mb-4">
          <Input
            type="text"
            autoComplete="username"
            placeholder="Enter email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            disabled={isFormSubmiting ? true : false}
          />
          <p className="text-xs pt-2 pl-1 text-destructive">{errors.email?.message}</p>
        </div>
        <div className="">
          <Input
            type="password"
            isPassword={"true"}
            placeholder="Enter password"
            {...register("password")}
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            disabled={isFormSubmiting ? true : false}
          />
          <p className="text-xs pt-2 pl-1 text-destructive">{errors.password?.message}</p>
        </div>
        <Button
          variant={"link"}
          className="p-0 block text-sm mt-1 text-right cursor-pointer font-light"
          asChild>
          <Link to={"/forgot-password"}>Forgot your password ?</Link>
        </Button>

        <Button
          className="cursor-pointer text-sm mt-6 hover:bg-white/75"
          disabled={isFormSubmiting ? true : false}>
          {isFormSubmiting ? (
            <span className=" flex items-center gap-2">
              <LuLoaderCircle className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      <div className="mt-2 text-center">
        Don't have an account?{" "}
        <Button
          variant={"link"}
          className="p-0 text-right cursor-pointer tracking-wider"
          asChild>
          <Link to={"/signup"}>Create</Link>
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
