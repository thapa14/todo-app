import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("list");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else return [];
};

const initialValue = {
  filtered: "All",
  list: getInitialTodo(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        content: action.payload.content,
        completed: false,
      };
      state.list.push(newTodo);
      const list = window.localStorage.getItem("list");
      if (list) {
        const listArr = JSON.parse(list);
        listArr.push(newTodo);
        window.localStorage.setItem("list", JSON.stringify(listArr));
      } else window.localStorage.setItem("list", JSON.stringify([newTodo]));
      // return { ...state, list: [newTodo, ...state.list] };
    },

    deleteTodo: (state, action) => {
      const newState = state.list.filter((val) => {
        return val.id !== action.payload;
      });
      window.localStorage.setItem("list", JSON.stringify([...newState]));
      return { ...state, list: [...newState] };
    },

    toggleCompleted: (state, action) => {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.list[index].completed = action.payload.completed;
      window.localStorage.setItem("list", JSON.stringify([...state.list]));
    },

    clearCompleted: (state, action) => {
      const newState = state.list.filter((val) => val.completed !== true);
      window.localStorage.setItem("list", JSON.stringify([...newState]));
      return { ...state, list: [...newState] };
    },
    listFilter: (state, action) => {
      state.filtered = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleCompleted,
  clearCompleted,
  listFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
