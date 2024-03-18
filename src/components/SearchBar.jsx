import React from 'react';
import { CiSearch } from 'react-icons/ci';
import styles from '../styles/SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.SearchBarContainer}>
      <input className={styles.Input} type="search" placeholder="Search Events" />
      <input className={styles.Location} type="search" placeholder="Location" />
      <button className={styles.Button}>
        <CiSearch fill="white" />
      </button>
    </div>
  );
};

export default SearchBar;
