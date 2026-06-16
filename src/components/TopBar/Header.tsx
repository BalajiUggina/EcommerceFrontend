"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
const Header = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <header className="border-b border-gray-200">
      <div
        className="
        max-w-[1170px]
        mx-auto
        h-[80px]
        flex
        items-center
        justify-between
      "
      >
        {/* Logo */}

        <h1
          className="
          text-[24px]
          font-bold
          tracking-[0.03em]
        "
        >
          Exclusive
        </h1>

        {/* Navigation */}

        <nav className="flex items-center gap-12">
          <Link href="/">Home</Link>

          <Link href="/products">Products</Link>

          <Link href="/contact">Contact</Link>

          <Link href="/about">About</Link>
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-4">
          <SearchBar />

          <Link href={"/wishlist"}>
            <Image
              src="/icons/Wishlist.svg"
              alt="wishlist"
              height={24}
              width={24}
            />
          </Link>

          <Link href="/cart" className="relative">
            <Image
              src="/icons/Cart.svg"
              alt="cart-icon"
              height={24}
              width={24}
            />

            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-[10px]
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
            >
              2
            </span>
          </Link>

          {isLoading ? (
            // skeleton placeholder while auth state initializes
            <div className="flex items-center gap-3">
              <div className="w-10 h-8 rounded-md skeleton" />
            </div>
          ) : isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link href="/register" className="text-sm font-medium">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
