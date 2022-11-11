import React from 'react';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductSkeletonDetail from '../components/ProductSkeletonDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';

const useStyles = makeStyles((theme) => ({
  root: {},
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

function DetailPage(props) {
  const classes = useStyles();

  const {
    params: { productId },
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <ProductSkeletonDetail />;
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit:', formValues);
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={1}>
            <Grid item className={classes.left} xs={12} sm={6} md={4} lg={4}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right} xs={12} sm={6} md={8} lg={8}>
              <ProductInfo product={product} />
              <AddToCartForm onChange={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu></ProductMenu>
      </Container>
    </Box>
  );
}

export default DetailPage;
