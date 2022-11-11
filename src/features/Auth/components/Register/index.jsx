import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      //* auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);

      unwrapResult(resultAction);

      // Close Dialog
      // if (closeDialog) {
      //   closeDialog();
      // }
      closeDialog && closeDialog();

      enqueueSnackbar('Register successfully !!', { variant: 'success' });
    } catch (error) {
      console.log('fail to register user', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      {/* <LinearProgress /> */}
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
