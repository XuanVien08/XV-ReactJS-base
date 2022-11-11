import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import productApi from 'api/productApi';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import FilterViewer from '../components/FilterViewer';
import { useMemo } from 'react';

const useStyles = makeStyles({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row column',
    marginTop: '1.5rem',
    paddingBottom: '1.5rem',
  },
});

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // true => "true"
    // {isPromotion: "true"}
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'created_at:DESC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
    limit: 1,
  });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'created_at:DESC',
  // }));

  // useEffect(() => {
  // TODO: Sync filters to URL
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: quyeryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll(queryParams);
        const { data, pagination } = await response;
        setProductList(data);
        setPagination(pagination);
        // console.log(response);
      } catch (error) {
        console.log('failed to fetch productList', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
    setLoading(true);
  };
  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });

    setLoading(true);
  };

  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left} xs={12} sm={4} md={3} lg={2}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
                data={productList}
                // categoryList={categoryList}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right} xs={12} sm={8} md={9} lg={10}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange1={handlePageChange}
              />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {loading ? (
                <ProductSkeletonList pagination={pagination} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box>
                <Pagination
                  className={classes.pagination}
                  color="secondary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
