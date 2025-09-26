import React, { useEffect, useState } from "react";
import { Button, Input } from "../ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoaderCircle } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const schema = z.object({
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password length must be greater than 6" }),
});

function ResetPasswordForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setFocus("password");
    }, 2000);
  }, []);

  const submitHandler = (data) => {
    setIsFormSubmitting(true);
    console.log(data);

    setTimeout(() => {
      toast.success("Password Reset Successfull.")
      setIsFormSubmitting(false);
      navigate("/login")
    }, 2000);
    
    
  };

  if (error) {
    return (
      <div>
        <p className="text-destructive text-lg">{error}</p>
      </div>
    );
  }

  return loading ? (
    <div>
      <div className="loader"></div>
    </div>
  ) : (
    <div className="w-full max-w-md border rounded-lg sm:px-8 px-6 sm:py-10 py-8 bg-zinc-800/30">
      <h1 className="text-center text-3xl mb-5">Reset Password</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5">
        <div>
          <Input
            type="password"
            isPassword={true}
            placeholder="Enter new password"
            aria-invalid={errors.password ? true : false}
            disabled={isFormSubmitting ? true : false}
            {...register("password")}
          />
          <p className="text-xs pt-2 pl-1 text-destructive">{errors.password?.message}</p>
        </div>
        <Button disabled={isFormSubmitting ? true : false} className="cursor-pointer">
          {isFormSubmitting ? (
            <span className="flex items-center gap-2">
              <LuLoaderCircle className="animate-spin" />
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
