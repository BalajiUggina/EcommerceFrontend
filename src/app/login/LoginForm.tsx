"use client";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthInput from "@/src/components/Login/AuthInput";
import GoogleSignInButton from "@/src/components/Login/GoogleLoginButton";
import { CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { postCall } from "@/src/services/api";
import Loader from "@/src/components/UI/Loader";
import { storage } from "@/src/services/storage";
import { ErrorResponse } from "@/src/types/api.types";
import { useAuth, User } from "@/src/context/AuthContext";
// interface for form data
export type LoginFormData = {
  email: string;
  password: string;
};

export interface Data {
  user: User;
  access: string;
  refresh: string;
}

export type LoginResponse = {
  message: string;
  data: Data;
};

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean | null>(false);
  const router = useRouter();
  const { login } = useAuth();
  const initialFormData: LoginFormData = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: initialFormData,
  });

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }
      setLoading(true);

      const response: LoginResponse = await postCall("/auth/google/", {
        token: credentialResponse.credential,
      });
      // Store JWT tokens here
      storage.setTokens(response.data.access, response.data.refresh);
      login(response.data.user);
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
    router.push("/");
  };

  const onSubmit = async (data: LoginFormData) => {
    const payload = {
      ...data,
      email: data.email.toLowerCase(),
      password: data.password.trim(),
    };
    console.log(payload);
    try {
      const response: LoginResponse = await postCall("auth/login/", payload);
      console.log(response);
      storage.setTokens(response.data.access, response.data.refresh);
      login(response.data.user);
    } catch (error: ErrorResponse) {
      toast.error(
        error?.errors?.error?.[0] || "Login failed. Please try again.",
      );
      return;
    } finally {
      reset(initialFormData);
    }
    router.push("/"); // Redirect to homepage after login
  };

  return (
    <div
      className="
      w-[371px]
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        w-full
        flex
        flex-col
        space-y-4
        "
      >
        {/* Heading */}

        <div className="space-y-1">
          <h1
            className="
            text-[32px]
            font-semibold
            "
          >
            Login in to your account
          </h1>

          <p className="text-base">Enter your details below</p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="
          flex
          flex-col
          space-y-4
          "
        >
          <div className="space-y-6">
            <AuthInput
              register={register}
              name="email"
              placeholder="Email"
              error={formErrors.email?.message}
              autocomplete="new-email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              }}
            />

            <AuthInput
              register={register}
              name="password"
              type="password"
              placeholder="Password"
              error={formErrors.password?.message}
              autocomplete="new-password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
            />
          </div>

          <div className="flex justify-between gap-4 items-center">
            <button
              type="submit"
              className="btn-primary h-14 w-40"
              disabled={isSubmitting || !Object.keys(initialFormData).length}
            >
              Login
            </button>
            <div
              className="
            flex
            justify-center
            gap-2
            text-sm
            "
            >
              <Link
                href="/forgot-password"
                className="underline text-primary"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
        <GoogleSignInButton
          handleGoogleSignIn={handleGoogleSignIn}
          text="signin_with"
        />
        <div
          className="
            flex
            justify-center
            gap-2
            text-sm
            "
        >
          <span>Don't you have an account?</span>

          <Link href="/register" className="underline">
            Sign Up here
          </Link>
        </div>
      </div>

      <Loader isLoading={loading} />
    </div>
  );
}
