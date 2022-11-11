import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PasswordField from 'components/form-controls/PasswordField';
RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },

  avatar: {
    // marginBottom: theme.spacing(2),
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    color: '#7f7a7a',
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: '0',
    right: '0',
  },
}));

function RegisterForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please Enter Your Full Name')
      .test('should has at least two words', 'Please Enter At least two words', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please Enter Your Email')
      .email('Please Enter A Valid Email Address'),
    password: yup
      .string()
      .required('Please Enter Your Password')
      .min(6, 'Please Enter At least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please Retype Your Password')
      .oneOf([yup.ref('password')], 'Password Does Not Match'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnsubmit = async (values) => {
    // console.log('TodoForm :', values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleOnsubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Create An Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
