import React, { useState } from 'react';
import style from './SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const SearchBar = ({ onHandleSubmit }) => {
  const [query, setQuery] = useState('');

  const onHandleChange = e => {
    const value = e.target.value.toLowerCase().trim();
    setQuery(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <header className={style.searchBar}>
      <form className={style.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <FcSearch size={20} />
        </button>

        <input
          onChange={onHandleChange}
          value={query}
          className={style.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
