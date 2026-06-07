import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions } from "./questionService";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await getQuestions();
    return response.data;
  }
);

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(
      fetchQuestions.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchQuestions.fulfilled,
      (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      }
    );

    builder.addCase(
      fetchQuestions.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );

  },
});

export default questionSlice.reducer;