import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
// import InputField from './../../../../components/form-controls/InputField/index';

TodoForm1.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm1({ onSubmit }) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title').min(5, 'Title is too short!'),
  });

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    // console.log('TodoForm :', values);
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} name="title" label="Todo" />
    </form>
  );
}

export default TodoForm1;
