import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  description: {
    margin: theme.spacing(2, 0),
  },

  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },

  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
  },

  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },

  promotionPercent: {},
}));

ProductInfo.propTypes = { product: PropTypes.object };

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  const color = promotionPercent ? 'rgb(255, 66, 78)' : '';
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>

      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice} color={color}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent} color={color}>
              {`-${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
