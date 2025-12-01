import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search products..."}
        className="w-full px-3 py-2 border rounded-md text-sm outline-none border-gray-300 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
