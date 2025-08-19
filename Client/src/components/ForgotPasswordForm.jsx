import React, { useEffect, useState } from "react";
import { Button, Input } from "./ui";
import { Link } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { MdMarkEmailRead } from "react-icons/md";
import toast from "react-hot-toast";

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
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    setFocus("email");
  }, []);

  const submitHandler = (data) => {
    setIsFormSubmitting(true);
    console.log(data);
    
    setTimeout(() => {
      toast.success("Email Sent.")
      setIsFormSubmitting(false);
      setFormStep(2);
    }, 2000);
  };

  return formStep === 1 ? (
    <div className="w-full max-w-md bg-zinc-800/30 rounded-lg sm:px-8 px-6 sm:py-10 py-8 border">
      <div className="mb-6 text-center">
        <h1 className="text-3xl">Forgot Password</h1>
        <p className="text-sm text-neutral-400 mt-2">
          Don't worry, we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5">
        <div>
          <Input
            type={"text"}
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
        Remember your password?{" "}
        <Button variant={"link"} className="p-0 tracking-wider" asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  ) : (
    <div className="sm:px-8 px-6 py-10 sm:py-8 rounded-lg border w-full max-w-md bg-zinc-900/40">
      <div className="text-center mb-6">
        {/* <HiOutlineMail className="mx-auto w-14 h-14" /> */}
        <MdMarkEmailRead className="mx-auto text-neutral-200 w-12 h-12" />
        <h1 className="text-xl">Check your email</h1>
      </div>

      <div className="text-neutral-400 mt-4">
        <p className="">An email has been sent to you to reset the password.</p>
        <p>Please contact us if you do not receive it within a few minutes.</p>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
