import React, { useState } from "react";
import styles from "../design/SearchBar.module.scss";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          name="SearchBar"
          id="SearchBar"
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={styles.searchButton} onClick={handleSearchClick}>
          SÖK!
        </button>
      </div>
    </>
  );
}

export default SearchBar;
