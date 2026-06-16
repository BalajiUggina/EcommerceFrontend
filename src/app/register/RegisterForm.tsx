"use client";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthInput from "@/src/components/Login/AuthInput";
import GoogleSignInButton from "@/src/components/Login/GoogleLoginButton";
import { CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { postCall } from "@/src/services/api";
import { ErrorResponse } from "@/src/types/api.types";
import { useLoader } from "@/src/context/LoadingContext";
import Loader from "@/src/components/UI/Loader";
import { useAuth, User } from "@/src/context/AuthContext";
import { Data } from "../login/LoginForm";
import { storage } from "@/src/services/storage";

// interface for form data
export type RegisterFormData = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type LoginResponse = {
  message: string;
  data:Data
};

export default function RegisterForm() {
  const {isLoading,setIsLoading}=useLoader();
  const router = useRouter(); 
  const {login}=useAuth();

  const initialFormData: RegisterFormData = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    defaultValues: initialFormData,
  });
  
  // handler for google sign in response
  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      setIsLoading(true);
      const response:LoginResponse = await postCall("/auth/google/", {
        token: credentialResponse.credential,
      });
      console.log(response);
      // Store JWT tokens here
      storage.setTokens(response.data.access, response.data.refresh);
      login(response.data.user);
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
    router.push("/"); 
  };
  const password = watch("password");

  // submit handler for registration form
  const onSubmit = async (data: RegisterFormData) => {
    const payload = {
      ...data,
      full_name: data.full_name.trim(),
      email: data.email.toLowerCase(),
      password: data.password.trim(),
      confirm_password: data.confirm_password.trim(),
    };
    console.log(payload);
    try {
      await postCall("auth/register/", payload);
    } catch (error:ErrorResponse) {
      toast.error(
        error?.errors?.email?.[0] || "Registration failed. Please try again.",
      );
      return;
    } finally {
      reset(initialFormData);
    }
    router.push("/login"); // Redirect to login page after registration
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
            text-[36px]
            font-semibold
            "
          >
            Create an account
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
              name="full_name"
              placeholder="Full Name"
              error={formErrors.full_name?.message}
              autocomplete="new-name"
              rules={{
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              }}
            />

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

            <AuthInput
              register={register}
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              autocomplete="new-password"
              error={formErrors.confirm_password?.message}
              rules={{
                required: "Confirm password is required",

                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className={`h-14 rounded font-medium ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#DB4444] text-white cursor-pointer"}`}
              disabled={isSubmitting || !Object.keys(initialFormData).length}
            >
              Create Account
            </button>

            <GoogleSignInButton handleGoogleSignIn={handleGoogleSignIn} text="signup_with" />
          </div>

          <div
            className="
            flex
            justify-center
            gap-2
            text-sm
            "
          >
            <span>Already have account?</span>

            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
      <Loader isLoading={isLoading}/>
    </div>
  );
}
