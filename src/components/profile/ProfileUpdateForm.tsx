"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import ProfileInput from "./ProfileInput";
import { useAuth, User } from "@/src/context/AuthContext";
import { patchCall } from "@/src/services/api";
import { useEffect, useState } from "react";

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}
export default function ProfileUpdateForm() {
  const { user,setUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);

  useEffect(() => {
    setProfileUser(user);
  }, [user]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",

      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    const [fn, ln] = profileUser?.full_name?.split(" ") ?? ["", ""];
    reset({
      first_name: fn || "",
      last_name: ln || "",
      email: profileUser?.email || "",
      address: (profileUser as any)?.address || "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  }, [profileUser, reset]);

  const newPassword = watch("new_password");

  const onSubmit = async (data: ProfileFormData) => {
    const first_name = data.first_name.trim();
    const last_name = data.last_name.trim();
    const full_name = `${first_name} ${last_name}`;
    try {
      const payload: Record<string, string> = {
        full_name: full_name.trim(),
        email: data.email.toLowerCase(),
        address: data.address.trim(),
      };

      if (data.current_password) {
        payload.current_password = data.current_password;

        payload.new_password = data.new_password;
        payload.confirm_password = data.confirm_password;
      }

      const updatedUser=await patchCall("/auth/profile-update/", payload);
      setUser(updatedUser.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.errors?.[0] || "Profile updation failed!");
    }
    reset();
  };

  return (
    <div
      className="
      w-full
      max-w-[870px]
      bg-white
      rounded
      shadow-[0_1px_13px_rgba(0,0,0,0.05)]
      p-10
      "
    >
      <h2
        className="
        text-primary
        text-xl
        font-medium
        mb-8
        "
      >
        Edit Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}

        <div className="grid md:grid-cols-2 gap-6">
          <ProfileInput
            label="First Name"
            register={register}
            name="first_name"
            placeholder="First Name"
            error={errors.first_name?.message}
            rules={{
              required: "First name is required",

              minLength: {
                value: 2,
                message: "Minimum 2 characters required",
              },
            }}
          />

          <ProfileInput
            label="Last Name"
            register={register}
            name="last_name"
            placeholder="Last Name"
            error={errors.last_name?.message}
            rules={{
              required: "Last name is required",

              minLength: {
                value: 2,
                message: "Minimum 2 characters required",
              },
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProfileInput
            label="Email"
            register={register}
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            rules={{
              required: "Email is required",

              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter valid email",
              },
            }}
          />

          <ProfileInput
            label="Address"
            register={register}
            name="address"
            placeholder="Address"
            error={errors.address?.message}
            rules={{
              required: "Address is required",

              minLength: {
                value: 5,
                message: "Address is too short",
              },
            }}
          />
        </div>

        {/* Password Section */}

        <div>
          <h3 className="mb-4 font-medium">Password Changes</h3>

          <div className="space-y-4">
            <ProfileInput
              register={register}
              name="current_password"
              type="password"
              placeholder="Current Password"
              error={errors.current_password?.message}
            />

            <ProfileInput
              register={register}
              name="new_password"
              type="password"
              placeholder="New Password"
              error={errors.new_password?.message}
              rules={{
                validate: (value, formValues) => {
                  if (formValues.current_password && !value) {
                    return "New password is required";
                  }

                  if (value && value.length < 8) {
                    return "Password must be at least 8 characters";
                  }

                  return true;
                },
              }}
            />

            <ProfileInput
              register={register}
              name="confirm_password"
              type="password"
              placeholder="Confirm New Password"
              error={errors.confirm_password?.message}
              rules={{
                validate: (value) => {
                  if (newPassword && !value) {
                    return "Confirm password is required";
                  }

                  if (value !== newPassword) {
                    return "Passwords do not match";
                  }

                  return true;
                },
              }}
            />
          </div>
        </div>

        {/* Actions */}

        <div className="flex justify-end items-center gap-8">
          <button
            type="button"
            className="btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary h-14 px-12"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
