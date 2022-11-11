import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST } from 'constants/index';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const color = product.promotionPercent ? 'rgb(255, 66, 78)' : '';
  return (
    <Box padding={1}>
      <Box padding={1}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1} color={color}>
          {formatPrice(product.salePrice)}
        </Box>
        <Box color={color} component="span">
          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Box>
      </Typography>
    </Box>
  );
}

export default Product;
