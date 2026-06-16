import Image from "next/image";

export default function AuthBanner() {
  return (
    <div
      className="
      bg-[#CBE4E8]
      relative
      overflow-hidden
      "
    >
      <Image
        src="/images/auth/signup-banner.jpg"
        width={700}
        height={800}
        alt="Signup Banner"
        className="object-cover h-full"
      />
    </div>
  );
}
