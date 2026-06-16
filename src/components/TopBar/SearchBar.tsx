import Image from "next/image";
const SearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-[#F5F5F5] px-4 h-[38px] w-[243px] rounded">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent outline-none text-[12px] font-normal flex-1"
      />

      <Image src="/icons/SearchIcon.svg" alt="search-icon" width={24 }height={24} className="cursor-pointer" />
    </div>
  );
};

export default SearchBar;