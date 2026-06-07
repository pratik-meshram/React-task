// app/store.js

import { configureStore } from "@reduxjs/toolkit"; //global store
import questionReducer from "../features/questions/questionSlice";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
  },
});