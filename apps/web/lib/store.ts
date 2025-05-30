import { configureStore } from "@reduxjs/toolkit";
import blockReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    form: blockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
