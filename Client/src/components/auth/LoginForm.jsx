import React, { useEffect, useState } from "react";
import { Button, Input } from "../ui";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoaderCircle } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import loginSchema from "@/schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/userSlice";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [isFormSubmiting, setIsFormSubmiting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.user.authStatus);

  useEffect(() => {
    if (authStatus) {
      navigate("/dashboard");
    } else {
      setFocus("email");
    }
  }, []);

  const submitHandler = async (data) => {
    setIsFormSubmiting(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          data
        );
        console.log(response.data);

        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(login(response.data.user));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.user.refreshToken)
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          toast.error(error.response.data.message);
        }
      } finally {
        setIsFormSubmiting(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-zinc-800/30 sm:px-8 px-6 sm:py-10 py-8 rounded-lg max-w-md w-full border">
      <div className="text-center mb-5 ">
        <h1 className="text-3xl text-center">Login</h1>
        {/* <p className="">Sign in to access your account</p> */}
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
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
