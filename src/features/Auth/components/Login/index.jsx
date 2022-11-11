import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';

import LoginForm from '../LoginForm';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const action = login(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);
      unwrapResult(resultAction);

      // Close Dialog
      // if (closeDialog) {
      //   closeDialog();
      // }
      closeDialog && closeDialog();
    } catch (error) {
      console.log('fail to Login', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      {/* <LinearProgress /> */}
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
