import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';

AddToCartForm.propTypes = {
  onChange: PropTypes.func,
};

function AddToCartForm({ onChange }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'please enter at least 1')
      .required('please enter quantity')
      .typeError('please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleOnsubmit = async (values) => {
    // console.log('TodoForm :', values);
    if (onChange) {
      await onChange(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleOnsubmit)} style={{ padding: '16px' }}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: '250px' }}
        size="large"
      >
        ADD TO CART
      </Button>
    </form>
  );
}

export default AddToCartForm;
