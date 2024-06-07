import React from "react";
import styles from "../design/SearchBar.module.scss";

function SearchBar() {
  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          name="SearchBar"
          id="SearchBar"
          className={styles.input}
        />
        <button className={styles.searchButton}>SÖK!</button>
      </div>
    </>
  );
}

export default SearchBar;
