import { RootState } from '@/app/store';
import { Todo } from '@/models/todo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.list = [...state.list, action.payload];
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const newList: Todo[] = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return item;
      });

      state.list = newList;
    },
    setListTodo(state, action: PayloadAction<Todo[]>) {
      state.list = action.payload;
    },
  },
});

// Actions
export const todoActions = todoSlice.actions;

// Selectors
export const selectListTodo = (state: RootState) => state.todo.list;

// Reducer
const todoReducer = todoSlice.reducer;
export default todoReducer;
