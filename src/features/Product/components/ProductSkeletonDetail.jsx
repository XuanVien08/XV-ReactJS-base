import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {},
  cart__img: { flexShrink: 0 },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: ` 1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    padding: theme.spacing(1.5),
    flex: '1 1 0',
  },
}));
ProductSkeletonDetail.propTypes = {
  pagination: PropTypes.object,
};

ProductSkeletonDetail.defaultProps = {
  pagination: {},
};

function ProductSkeletonDetail() {
  const classes = useStyles();

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={1}>
            <Grid item className={classes.left} xs={12} sm={6} md={4} lg={4}>
              <Box padding={1}>
                <Skeleton
                  animation="wave"
                  className={classes.cart__img}
                  variant="rect"
                  width="100%"
                  height={215}
                />
              </Box>
            </Grid>
            <Grid item className={classes.right} xs={12} sm={6} md={8} lg={8}>
              <Box padding={1}>
                <Skeleton animation="wave" height="40px" />
                <Skeleton animation="wave" height="40px" />
                <Skeleton animation="wave" height="40px" />
                <Skeleton animation="wave" height="40px" />
                <Skeleton animation="wave" height="40px" />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProductSkeletonDetail;
