import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncTimeSliceProps, IData } from "../types/types";

export const fetchData = createAsyncThunk<IData, string>(
  "asyncTimeSlice/fetchData",
  async (url) => {
    try {
      const responce = await axios.get(url);
      return responce.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: AsyncTimeSliceProps = {
  data: null,
  status: "",
  error: false,
};

export const asyncTimeSlice = createSlice({
  name: "asyncTimeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
        state.error = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      });
  },
});

export default asyncTimeSlice.reducer;
