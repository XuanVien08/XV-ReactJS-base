import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PasswordField from 'components/form-controls/PasswordField';

LoginForm.propTypes = {
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

function LoginForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please Enter Your Email')
      .email('Please Enter A Valid Email Address'),
    password: yup.string().required('Please Enter Your Password'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleOnsubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          SING IN
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
