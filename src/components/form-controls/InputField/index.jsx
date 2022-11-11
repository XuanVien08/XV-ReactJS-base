import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  // const { errors, formState } = form;
  const { errors } = form;

  //* Validate when already touched to input field
  // const hasError = formState.touched[name] && errors[name];

  //* Validate input field
  const hasError = errors[name];
  // console.log('errors', errors[name], formState.touched[name]);
  // console.log('errors', errors[name]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label={label}
          disabled={disabled}
          error={!!hasError} //=> convert object to boolean
          helperText={errors[name]?.message}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default InputField;
