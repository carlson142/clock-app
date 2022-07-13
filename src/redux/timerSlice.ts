import { createSlice } from "@reduxjs/toolkit";
import { InitialStateProps } from "../types/types";

const initialState: InitialStateProps = {
  showInfo: false,
};

export const timerSlice = createSlice({
  name: "timerSlice",
  initialState,
  reducers: {
    showDateInfo: (state) => {
      state.showInfo = !state.showInfo;
    },
  },
});

export const { showDateInfo } = timerSlice.actions;
export default timerSlice.reducer;
