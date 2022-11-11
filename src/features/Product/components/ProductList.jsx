import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Product from './Product';
import { useHistory } from 'react-router-dom';
import quyeryString from 'query-string';
import { useEffect } from 'react';
import { useState } from 'react';
ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data = [] }) {
  const history = useHistory();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    // TODO: Sync filters to URL

    if (productId === '') return;
    history.push({
      pathname: `${history.location.pathname}/${productId}`,
    });
  }, [history, productId]);
  const handleProductClick = (productId) => {
    setProductId(productId);
  };

  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Box onClick={() => handleProductClick(product.id)}>
              <Product product={product}></Product>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
