// lib/slices/FormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form } from "../../types";

const initialState: Form[] = [];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      // console.log(action.payload);
      // state = action.payload;
      // console.log(state);
      return action.payload;
    },
    addForm: (state, action: PayloadAction<Form>) => {
      state.push(action.payload);
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
export const { setForms, updateForm, addForm } = formSlice.actions;
export default formSlice.reducer;
