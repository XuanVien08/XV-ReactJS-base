import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRef } from 'react';

FilterPost.propTypes = {
  onSubmit: PropTypes.func,
};

FilterPost.defaultProps = {
  onSubmit: null,
};
function FilterPost({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);

  function handleSearchTerm(e) {
    const value = e.target.value;
    setSearchTerm(e.target.value);

    if (!onSubmit) return;

    // SET -- 100s -- Clear, SET -- 300 -- Submit
    // SET -- 300 -- Submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const fromValue = {
        searchTerm: value,
      };
      onSubmit(fromValue);
    }, 300);
  }

  return (
    <div>
      <input type="text" value={searchTerm} placeholder="Search posts..." onChange={handleSearchTerm}></input>
    </div>
  );
}

export default FilterPost;
