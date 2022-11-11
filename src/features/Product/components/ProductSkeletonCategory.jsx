import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ProductSkeletonCategory.propTypes = {
  categoryList: PropTypes.number,
};

ProductSkeletonCategory.defaultProps = {
  categoryList: 0,
};

function ProductSkeletonCategory({ categoryList }) {
  const length = categoryList <= 1 ? 6 : categoryList;
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12}>
            <Box padding={1}>
              <Skeleton animation="wave" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonCategory;
