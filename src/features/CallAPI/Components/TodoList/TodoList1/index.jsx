import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList({ todoList, onTodoClick }) {
  function handleTodoClick(todo) {
    if (!onTodoClick) return;
    onTodoClick(todo);
  }


  return (
    <ul className="todo-list">
      {console.log(todoList)}
      {todoList.map((todo, idx) => (
        <li key={idx} className="todo-item" onClick={() => handleTodoClick(todo)}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
