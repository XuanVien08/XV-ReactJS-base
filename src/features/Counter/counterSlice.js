// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase(state, actions) {
      return state + 1;
    },
    decrease(state, actions) {
      return state - 1;
    },
  },
});

const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions; //name export
export default reducer; // default export
