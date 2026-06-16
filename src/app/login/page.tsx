
import AuthBanner from "@/src/components/Login/AuthBanner";
import LoginForm from "./LoginForm";
export default function LoginPage() {
  return (
    <section className="mx-auto flex items-center gap-4 max-w-[1305px] p-2">
      <AuthBanner />
      <LoginForm />
    </section>
  );
}
