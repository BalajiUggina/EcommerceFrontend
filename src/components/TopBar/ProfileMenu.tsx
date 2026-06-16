"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

const menuItems = [
  {
    label: "Manage My Account",
    icon: "/icons/User.svg",
    url: "/profile",
  },
  {
    label: "My Order",
    icon: "/icons/Orders.svg",
    url: "/orders",
  },
  {
    label: "My Cancellations",
    icon: "/icons/Cancellations.svg",
    url: "/cancel-orders",
  },
  {
    label: "My Reviews",
    icon: "/icons/Reviews.svg",
    url: "/reviews",
  },
  {
    label: "Logout",
    icon: "/icons/Logout.svg",
    url: "/login",
  },
];

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function handlePointerDown(e: Event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <Image
          src="/icons/User.svg"
          alt="user-icon"
          height={32}
          width={32}
          className="bg-red-500 text-white rounded-full p-1 cursor-pointer"
        />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          top-12
          w-[225px]
          bg-black/50
          backdrop-blur-md
          rounded
          shadow-lg
          z-50
        "
        >
          <div className="flex flex-col gap-[13px] px-5 py-[18px]">
            {menuItems.map((item) => {
              return (
                <Link
                  href={item.url}
                  key={item.label}
                  className="
                    flex
                    items-center
                    gap-4
                    h-8
                    text-[#FAFAFA]
                    text-[14px]
                    hover:text-red-400
                    transition
                  "
                  onClick={async (e: MouseEvent<HTMLAnchorElement>) => {
                    // close dropdown on any click
                    setOpen(false);

                    if (item.label.toLowerCase() === "logout") {
                      // prevent Link navigation; we'll navigate after logout
                      e.preventDefault();
                      try {
                        // support sync or async logout implementations
                        await Promise.resolve(logout());
                      } catch (err) {
                        console.error("Logout failed:", err);
                      } finally {
                        // ensure navigation to login
                        try {
                          router.push(item.url);
                        } catch (navErr) {
                          console.error(
                            "Navigation after logout failed:",
                            navErr,
                          );
                        }
                      }
                    }
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    height={24}
                    width={24}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
