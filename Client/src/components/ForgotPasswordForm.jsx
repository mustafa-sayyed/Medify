import React, { useEffect, useState } from "react";
import { Button, Input } from "./ui";
import { Link } from "react-router";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle } from "react-icons/lu";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

function ForgotPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm({ resolver: zodResolver(schema) });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formState, setFormState] = useState("email sent");
  

  useEffect(() => {
    setFocus("email");
  }, []);

  const submitHandler = (data) => {
    setIsFormSubmitting(true);
    console.log(data);
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/30 rounded-lg sm:px-8 px-6 sm:py-10 py-8 border">
      <div className="mb-6 text-center">
        <h1 className="text-3xl">Forgot Password</h1>
        <p className="text-sm text-neutral-400 mt-2">
          Don't worry, we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5">
        <div>
          <Input
            type={"email"}
            placeholder="Enater email"
            aria-invalid={errors.email ? true : false}
            disabled={isFormSubmitting ? true : false}
            {...register("email")}
          />
          <p className="text-xs pt-2 pl-1 text-destructive">{errors.email?.message}</p>
        </div>

        <Button disabled={isFormSubmitting ? true : false} className="cursor-pointer">
          {isFormSubmitting ? (
            <span className="flex items-center gap-2">
              <LuLoaderCircle className="animate-spin" />
              Sending Email...
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      <div className="text-center mt-4">
        Remember your password? {" "}
        <Button variant={"link"} className="p-0 tracking-wider" asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
