import { configureStore } from "@reduxjs/toolkit";
import asyncTimeSlice from "./asyncTimeSlice";
import timerSlice from "./timerSlice";

export const store = configureStore({
  reducer: {
    timerReducer: timerSlice,
    asyncTimeReducer: asyncTimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
