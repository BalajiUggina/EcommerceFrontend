import { UseFormRegister, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { RegisterFormData } from "./RegisterForm";

type AuthInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  type?: string;
  rules?: RegisterOptions<RegisterFormData>;
  placeholder?: string;
  autocomplete?: string;
};

export default function AuthInput<T extends FieldValues>({
  register,
  name,
  error,
  type="text",
  rules,
  placeholder,
  autocomplete,
}: AuthInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name,rules)}
        autoComplete={autocomplete}
        className="input-auth"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
