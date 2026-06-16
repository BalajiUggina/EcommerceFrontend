"use client";
import AuthBanner from "@/src/components/Login/AuthBanner";
import RegisterForm from "./RegisterForm";
import { LoadingProvider } from "@/src/context/LoadingContext";
export default function RegisterPage() {
  return (
    <section className="mx-auto flex items-center gap-4 max-w-[1305px] p-2">
      <LoadingProvider>
        <AuthBanner />
        <RegisterForm />
      </LoadingProvider>
    </section>
  );
}
