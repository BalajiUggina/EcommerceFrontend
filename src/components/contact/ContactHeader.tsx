import Link from "next/link";

export default function ContactHeader() {


  return (
    <div className="flex justify-start items-center">
      <div className="text-sm">
        <Link href="/" className="text-gray-600">Home</Link>
        <span className="mx-3 text-black">/</span>
        <span>Contact</span>
      </div>
    </div>
  );
}