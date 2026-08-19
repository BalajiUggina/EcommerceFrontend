import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type ProfileInputProps<T extends FieldValues> = {
  label?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  autoComplete?: string;
};

export default function ProfileInput<
  T extends FieldValues,
>({
  label,
  register,
  name,
  error,
  type = "text",
  placeholder,
  rules,
  autoComplete,
}: ProfileInputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="
          text-base
          font-normal
          text-black
        "
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
        className="input-primary h-[50px]"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}