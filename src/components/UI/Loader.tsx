"use client";

interface Loader {
  isLoading: boolean | null;
  text?: string;
}

export default function Loader({
  isLoading,
  text = "Loading...",
}: Loader) {
  if (!isLoading) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-4
          rounded-lg
          px-8
          py-6
        "
      >
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-gray-300
            border-t-black
          "
        />
        <p className="text-md font-medium text-black">{text}</p>
      </div>
    </div>
  );
}
