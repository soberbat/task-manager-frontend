import React, { useState, Dispatch, SetStateAction } from "react";

interface ISearchBar {
  isExpandable: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
}
const SearchBar = ({ isExpandable, onChange, value }: ISearchBar) => {
  const [isExpanded, setisExpanded] = useState(false);
  const flex = !isExpandable
    ? "flex-1"
    : isExpanded
    ? "flex-[0.2]"
    : "flex-[0.08]";
  const border = !isExpandable
    ? "border border-[#292f4c]"
    : isExpanded && "border border-blue-500 ";
  return (
    <div
      className={`inline-block rounded-[4px] relative ${border} transition-all  ${flex} hover:bg-[#31324f] h-full`}
    >
      <input
        type="text"
        placeholder="Search"
        value={value}
        onClick={(e) => {
          setisExpanded(true), e.stopPropagation();
        }}
        onChange={(e) => onChange(e.target.value)}
        className="box-border bg-transparent py-2 pr-4 pl-10 font-thin text-sm focus:outline-none focus:border border-transparent w-full h-full text-[#d6d8df]"
      />
      <span
        onClick={(e) => {
          setisExpanded(!isExpanded), e.stopPropagation();
        }}
        className="left-0 absolute inset-y-0 flex items-center pl-3"
      >
        <svg
          className="w-5 h-5 text-[#d6d8df]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-5.2-5.2"
          ></path>
          <circle cx="10" cy="10" r="7"></circle>
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;
