import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-110 flex-col items-center justify-center">
      <h1 className="text-6xl font-bold ">404 Not Found</h1>

      <p className="mt-4 text-gray-500 text-[16px]">Your visited page not found. You may go home page.</p>

      <Link href="/" className="btn-primary mt-6 px-4 py-2">
        Back to home page
      </Link>
    </div>
  );
}
