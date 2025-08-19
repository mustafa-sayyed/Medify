import React, { useEffect, useState } from "react";
import { Button, Input } from "./ui";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";
import signupSchema from "@/schemas/signupSchema";
import { useDispatch } from "react-redux";
import { login } from "@/features/userSlice";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({ resolver: zodResolver(signupSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    setFocus("name");
  }, []);

  const submitHandler = (data) => {
    setIsFormSubmitting(true);
    setTimeout(async () => {
      try {
        const response = await axios.post("/users/register", data);

        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(login(response.data.user))
          cookieStore.set("token", response.data.token)
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          toast.error(error.response.data.message);
        }
        
      } finally {
        setIsFormSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-zinc-800/30 border sm:px-8 px-6 sm:py-10 py-8 rounded-lg">
      <div className="text-center mb-5">
        <h1 className="text-3xl">Sign Up</h1>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            disabled={isFormSubmitting ? true : false}
            aria-invalid={errors.name ? true : false}
            {...register("name")}
          />
          <p className="text-xs text-destructive pt-2 pl-1">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            autoComplete="current-username"
            placeholder="Email"
            disabled={isFormSubmitting ? true : false}
            aria-invalid={errors.email ? true : false}
            {...register("email")}
          />
          <p className="text-xs text-destructive pt-2 pl-1">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <Input
            type="password"
            isPassword={"true"}
            placeholder="Password"
            autoComplete="current-password"
            disabled={isFormSubmitting ? true : false}
            aria-invalid={errors.password ? true : false}
            {...register("password")}
          />
          <p className="text-xs text-destructive pt-2 pl-1">{errors.password?.message}</p>
        </div>

        <Button
          disabled={isFormSubmitting ? true : false}
          className="mt-4 cursor-pointer hover:bg-white/75">
          {isFormSubmitting ? (
            <span className="flex items-center gap-2">
              <LuLoaderCircle className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      <div className="text-center mt-2">
        Already have an account ?{" "}
        <Button variant="link" className="cursor-pointer p-0 tracking-wider" asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default SignupForm;
