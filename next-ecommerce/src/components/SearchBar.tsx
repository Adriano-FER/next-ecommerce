"use client";

import Image from "next/image"
import { useRouter } from "next/navigation";

const SearchBar = () => {

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const searchTerm = formData.get("search") as string;

    if(searchTerm){
      router.push(`/list?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <form className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1" onSubmit={handleSearch}>
      <input type="text" name="search" placeholder="Buscar tours..." className="flex-1 bg-transparent outline-none"/>
      <button type="submit" className="cursor-pointer">
        <Image src="/search.png" alt="Buscar" width={16} height={16} className="opacity-50 hover:opacity-100 transition-opacity"/>
      </button>
    </form>
  );
};

export default SearchBar;
