import React from 'react';
import PropTypes from 'prop-types';
import styles from './Todo.module.scss';
import classnames from 'classnames';

TodoList2.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList2.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList2({ todoList, onTodoClick }) {
  function handleTodoClick(todo, idx) {
    if (!onTodoClick) return;
    onTodoClick(todo, idx);
  }

  return (
    <ul className={styles.todoList}>
      {/* {console.log(todoList)} */}
      {todoList.map((todo, idx) => (
        <li
          key={idx}
          className={classnames({
            [styles.completed]: todo.status === 'completed',
          })}
          onClick={() => handleTodoClick(todo, idx)}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList2;
