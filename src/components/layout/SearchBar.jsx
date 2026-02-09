// src/components/layout/SearchBar.jsx
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-white rounded-md overflow-hidden w-full">
      <input
        type="text"
        placeholder="Rechercher un produit"
        className="px-3 py-2 w-full text-sm outline-none"
      />
      <button className="bg-yellow-400 px-4 py-2 hover:bg-yellow-500 transition">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
