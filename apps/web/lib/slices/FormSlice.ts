// lib/slices/FormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form } from "../../types";

const initialState: Form[] = [];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      return action.payload;
    },
    updateForm: (
      state,
      action: PayloadAction<Partial<Form> & { id: string }>
    ) => {
      const form = state.find((form) => form.id === action.payload.id);
      if (form) Object.assign(form, action.payload);
    },
  },
});

// ✅ Clean and consistent export
export const { setForms, updateForm } = formSlice.actions;
export default formSlice.reducer;
