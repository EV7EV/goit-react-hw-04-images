import React, { Component } from 'react';
import style from './SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  onHandleChange = e => {
    const value = e.target.value.toLowerCase().trim();
    this.setState({ query: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onHandleSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={style.searchBar}>
        <form className={style.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <FcSearch size={20} />
          </button>

          <input
            onChange={this.onHandleChange}
            value={this.state.query}
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
