import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase } from './counterSlice';

// CounterFeature.propTypes = {};

function CounterFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  function handleIncreaseClick() {
    const action = increase(); // action creator
    console.log(action);
    dispatch(action);
  }

  function handleDecreaseClick() {
    const action = decrease(); // action creator
    dispatch(action);
  }

  return (
    <div>
      <h1>Counter Feature</h1>
      Counter : {count}
      <div>
        <button onClick={handleIncreaseClick}>increase</button>
        <button onClick={handleDecreaseClick}>decrease</button>
      </div>
    </div>
  );
}

export default CounterFeature;
