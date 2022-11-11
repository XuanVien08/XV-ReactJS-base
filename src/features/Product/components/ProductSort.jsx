import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number,
};

function ProductSort({ currentSort, onChange, onChange1, page, total }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <Tabs
        value={currentSort}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleSortChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Phổ Biến" value="created_at:DESC"></Tab>
        <Tab label="Bán Chạy" value="promotionPercent:DESC"></Tab>
        <Tab label="Hàng Mới" value="updated_at:DESC"></Tab>
        <Tab label="Giá Thấp Tới Cao" value="salePrice:ASC"></Tab>
        <Tab label="Giá Cao Xuống Thấp" value="salePrice:DESC"></Tab>
      </Tabs>
    </>
  );
}

export default ProductSort;
