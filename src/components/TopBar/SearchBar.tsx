"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setSearchQuery } from "@/src/store/slices/productsSlice";
import { useRouter, usePathname } from "next/navigation";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    if (pathname !== "/products") {
      router.push("/products");
    }
  };

  return (
    <div className="flex items-center justify-between bg-bg-secondary px-4 h-[38px] w-[243px] rounded border border-transparent focus-within:border-primary transition">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={searchQuery}
        onChange={handleSearchChange}
        className="bg-transparent outline-none text-[12px] font-normal flex-1 text-black placeholder:text-gray-400"
      />

      <Image
        src="/icons/SearchIcon.svg"
        alt="search-icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;