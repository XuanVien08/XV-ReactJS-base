import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import TodoFrom2 from '../../Components/TodoFrom2';
import TodoList2 from '../../Components/TodoList2';
import queryString from 'query-string';
import { useMemo } from 'react';
import TodoForm1 from './../../Components/todoFrom/index';

function ListPage() {
  const [todoList, setTodoList] = useState(() => {
    const TodoList = JSON.parse(localStorage.getItem('todoList'));
    return TodoList ?? [];
  });

  // const math = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  function handleTodoClick(todo, idx) {
    if (idx < 0) return;
    const newTodoList = [...todoList];
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };

    // console.log(newTodoList[idx]);
    setTodoList(newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  // function handleFromSubmit(fromValue) {
  //   const newTodo = {
  //     id: todoList.length + 1,
  //     ...fromValue,
  //   };
  //   const newTodoList = [...todoList];
  //   newTodoList.push(newTodo);
  //   setTodoList(newTodoList);
  //   localStorage.setItem('todoList', JSON.stringify(newTodoList));
  // }

  function handleShowAllClick() {
    // setFilteredStatus('all');
    const queryParams = { status: 'all' };
    history.push({
      pathname: matchMedia.path,
      search: queryString.stringify(queryParams),
    });
  }
  function handleShowCompletedClick() {
    // setFilteredStatus('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: matchMedia.path,
      search: queryString.stringify(queryParams),
    });
  }
  function handleShowNewClick() {
    // setFilteredStatus('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: matchMedia.path,
      search: queryString.stringify(queryParams),
    });
  }
  const renderTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
  }, [todoList, filteredStatus]);

  function handleTodoFormSubmit(values) {
    // console.log('form submit : ', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  return (
    <div>
      <h3>What to do ?</h3>
      <TodoForm1 onSubmit={handleTodoFormSubmit} />
      {/* <TodoFrom2 onSubmit={handleFromSubmit} /> */}
      <h3>TODO LIST</h3>
      <TodoList2 todoList={renderTodoList} onTodoClick={handleTodoClick} />

      <button onClick={handleShowAllClick}>Show ALL</button>
      <button onClick={handleShowCompletedClick}>Show Completed</button>
      <button onClick={handleShowNewClick}>Show New</button>
    </div>
  );
}

export default ListPage;
