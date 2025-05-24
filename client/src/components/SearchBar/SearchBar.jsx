import React from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search in table..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
