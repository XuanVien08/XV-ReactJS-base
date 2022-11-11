import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  // const { errors, formState } = form;
  const { errors } = form;
  const hasError = !!errors[name];
  // console.log(errors[name], formState[name]);

  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((x) => !x);
  }

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <OutlinedInput
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
          />
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
