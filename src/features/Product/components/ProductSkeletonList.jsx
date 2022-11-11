import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  cart__img: { flexShrink: 0 },
});

ProductSkeletonList.propTypes = {
  pagination: PropTypes.object,
};

ProductSkeletonList.defaultProps = {
  pagination: {},
};

function ProductSkeletonList({ pagination }) {
  const classes = useStyles();
  const length = pagination.limit <= 1 ? 12 : pagination.limit;
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton
                animation="wave"
                className={classes.cart__img}
                variant="rect"
                width="100%"
                height={215}
              />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
