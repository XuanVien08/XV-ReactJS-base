import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProductSkeletonCategory from '../ProductSkeletonCategory';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));

FilterByCategory.propTypes = {
  onchange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();

        setCategoryList(
          list.map((category) => ({
            id: category.id,
            name: category.name,
            salePrice: category.salePrice,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }

      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (!onChange) return;
    onChange(category.id);
  };

  return (
    <div>
      {loading ? (
        <ProductSkeletonCategory categoryList={categoryList.length} />
      ) : (
        <Box className={classes.root}>
          <Typography variant="subtitle2" >
            Danh Mục Sản Phẩm
          </Typography>

          <ul className={classes.menu}>
            {categoryList.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                {category.name}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
}

export default FilterByCategory;
