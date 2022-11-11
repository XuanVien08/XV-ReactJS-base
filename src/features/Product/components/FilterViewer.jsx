import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';
import freeShip from '../../../assets/images/freeship.png';
import astra from '../../../assets/images/astra.png';
import now from '../../../assets/images/now.png';
import { useMemo } from 'react';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
  img: {
    maxHeight: '12px',
    maxWidth: '100%',
    width: 'auto',
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => now,
    img: true,
    isActive: (filters) => filters.isFreeShip,
    isVisible: (filters) => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };

      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      // newFilters.isFreeShip ? delete newFilters.isFreeShip : (newFilters.isFreeShip = true);
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => astra,
    img: true,
    isActive: (filters) => filters.isPromotion,
    isVisible: (filters) => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };

      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      } else {
        newFilters.isPromotion = true;
      }
      // newFilters.isFreeShip ? delete newFilters.isFreeShip : (newFilters.isFreeShip = true);
      return newFilters;
    },
  },
  {
    id: 3,
    getLabel: () => freeShip,
    img: true,
    isActive: (filters) => filters.isFreeShip,
    isVisible: (filters) => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };

      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      // newFilters.isFreeShip ? delete newFilters.isFreeShip : (newFilters.isFreeShip = true);
      return newFilters;
    },
  },
  {
    id: 4,
    getLabel: (filters) =>
      `Từ ${formatPrice(filters.salePrice_gte)} đến ${formatPrice(filters.salePrice_lte)}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },

  {
    id: 5,
    getLabel: (filters) => {
      switch (filters['category.id']) {
        case 1:
          return 'Thời trang';
        case 2:
          return 'Khẩu trang';
        case 3:
          return 'Làm đẹp';
        case 4:
          return 'Laptop';
        case 5:
          return 'Ổ cứng';
        case 6:
          return 'Điện thoại';
        default:
          return '';
      }
    },
    isActive: (filters) => true,
    isVisible: (filters) => Boolean(filters['category.id']),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            variant="outlined"
            label={
              x.img ? (
                <img src={x.getLabel(filters)} className={classes.img} alt="" />
              ) : (
                x.getLabel(filters)
              )

              // <img src={x.getLabel(filters)} className={classes.img} />
            }
            color={x.isActive(filters) ? 'secondary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
