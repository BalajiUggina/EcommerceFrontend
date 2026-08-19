"use client";

import { postCall } from "@/src/services/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (
    data: ContactFormData
  ) => {
    try {
      console.log(data);

      // API Call Here
      await postCall("/contact/", data);

      toast.success("Message sent successfully");

      reset();
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div
      className="
        w-full
        max-w-[800px]
        bg-white
        rounded-[4px]
        shadow-[0_1px_13px_rgba(0,0,0,0.05)]
        p-10
      "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Top Inputs */}

        <div className="grid grid-cols-3 gap-[16px]">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              {...register("name", {
                required: "Name is required",
              })}
              className="input-primary h-[50px] text-[14px]"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email *"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^\S+@\S+\.\S+$/,
                  message:
                    "Enter valid email",
                },
              })}
              className="input-primary h-[50px] text-[14px]"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Your Phone *"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="input-primary h-[50px] text-[14px]"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}

        <div>
          <textarea
            placeholder="Your Message"
            {...register("message", {
              required:
                "Message is required",
            })}
            className="input-primary h-[207px] p-4 resize-none text-[14px]"
          />

          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary h-[56px] px-12"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}