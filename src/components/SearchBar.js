import React from 'react';

const SearchBar = ({ searchField, onSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchField}
                onChange={onSearchChange}
                placeholder="Search by Patient Name or NHS Number"
            />
        </div>
    );
};

export default SearchBar;