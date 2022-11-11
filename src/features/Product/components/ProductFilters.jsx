import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  data: PropTypes.array,
};

function ProductFilters({ filters, onChange, data }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handleChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService onChange={handleChange} filters={filters} />
    </Box>
  );
}

export default ProductFilters;
