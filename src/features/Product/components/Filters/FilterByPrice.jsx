import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { NumberFormatBase } from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,

    '& > h5': {
      color: 'rgb(128, 128, 137)',
    },
  },

  title: {
    margin: '0px',
    lineHeight: '20px',
    display: 'block',
    // color: 'rgb(56, 56, 61)',

    padding: ' 12px 0px',
  },
  range: {
    display: 'flex',
    flexFlow: ' row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      margin: `0 ${theme.spacing(1)}px 0`,
    },

    color: {
      border: `1px solid ${theme.palette.primary.dark}`,
    },
  },
  priceFilter: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    // display: 'block',
    cursor: 'pointer',
  },
}));

function MyCustomNumberFormat(props) {
  const format = (numStr) => {
    if (numStr === '') return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(numStr);
  };

  return <NumberFormatBase {...props} format={format} />;
}

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // convert object => array => object
    const newValues = Object.fromEntries(
      Object.entries({ ...values }).map(([key, value]) => [
        key,
        value
          .toString()
          .split('')
          .filter((x) => x !== '.' && x !== '₫')
          .join(''),
      ])
    );
    console.log('newValues', newValues);
    if (onChange) onChange(newValues);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="subtitle2" component="h4">
        GIÁ
      </Typography>

      <Typography variant="body2" component="h5">
        Chọn khoảng giá
      </Typography>
      <Box className={classes.range}>
        <MyCustomNumberFormat
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          size="small"
          variant="outlined"
          customInput={TextField}
        />
        <span>-</span>
        <MyCustomNumberFormat
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          variant="outlined"
          size="small"
          customInput={TextField}
        />
      </Box>
      {/* <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} /> */}
      {/* <span>-</span> */}
      {/* <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} /> */}
      <Button
        vartiant="outline"
        color="secondary"
        className={classes.color}
        onClick={handleSubmit}
        fullWidth
        variant="outlined"
      >
        Áp Dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
