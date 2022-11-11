import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';

import freeShip from '../../../../assets/images/freeship.png';

import astra from '../../../../assets/images/astra.png';
import now from '../../../../assets/images/now.png';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      marginTop: theme.spacing(1),
    },
  },

  Checkbox: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    '& > span > div': {
      marginLeft: '-16px',
    },
  },
  img: {
    maxHeight: '12px',
    width: 'auto',
    paddingRight: '5px',
  },
}));

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

function FilterByService({ onChange, filters }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>
      <ul className={classes.list}>
        {[
          {
            value: 'isFreeShip',
            img: now,
            label: 'Giao siêu tốc 2H',
          },
          {
            value: 'isPromotion',
            img: astra,
            label: 'Thưởng Thêm Astra',
          },
          {
            value: '',
            img: freeShip,
            label: 'Không giới hạn',
          },
        ].map((service) => (
          <li key={service.value} className={classes.Checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="secondary"
                  // size="small"
                />
              }
              label={
                <Box className={classes.Checkbox}>
                  <img src={service.img} className={classes.img} alt="" />
                  {service.label}
                </Box>
              }
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
