import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
});

export default questionSlice.reducer;