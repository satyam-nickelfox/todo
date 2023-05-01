import { createSlice } from "@reduxjs/toolkit";

interface todoState {
  toDoList: [];
}

const initialState: todoState = {
  toDoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.toDoList = action.payload;
    },
  },
});

// export const { increment, decrement } = todoSlice.actions;
export const { addTodo } = todoSlice.actions;
export const TODOLIST = (state: any) => state.todo;
export default todoSlice;
