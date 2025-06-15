import { PartialBlock } from "@blocknote/core";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface Form {
  title: string;
  coverPage?: string;
  logo?: string;
  blocks?: string;
  isPublished: boolean;
}

const intialState: Form[] = [];

export const FormSlice: Slice = createSlice({
  name: "form",
  initialState: intialState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      state.push(action.payload);
    },
    editForm: (state, action: PayloadAction<Form>) => {},
  },
});
export const { addForm, editForm } = FormSlice.actions;
export default FormSlice.reducer;
