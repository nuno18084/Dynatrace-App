import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search in table..."
          value={searchValue}
          onChange={handleChange}
          className="search-input"
        />
        {searchValue && (
          <button
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            <FiX className="clear-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
