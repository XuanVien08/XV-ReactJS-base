import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import { useRef } from 'react';

TodoFrom2.propTypes = {
  onSubmit: PropTypes.func,
};

TodoFrom2.defaultProps = {
  onSubmit: null,
};

function TodoFrom2({ onSubmit }) {
  const [todo, setTodo] = useState('');
  function handleTodo(e) {
    // e.preventDefault();
    setTodo(e.target.value);
  }

  const handleSubmit = (e) => {
    //prevent reloading browser
    e.preventDefault();
    if (!onSubmit) return;
    const fromValue = {
      title: todo,
      status: "new",
    };
    onSubmit(fromValue);
    setTodo('');
  };

  return (
    <form className="todoFrom" onSubmit={handleSubmit}>
      <input type="text" value={todo} onChange={(e) => handleTodo(e)} />
    </form>
  );
}

export default TodoFrom2;
