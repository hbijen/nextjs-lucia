'use client';

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
 
type SearchProps = {
  placeholder: string
}
export default function Search(props: SearchProps) {
  function handleSearch(term: string) {
    console.log(term);
  }
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="pl-10"
        placeholder={props.placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute h-[18px] w-[18px] left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}