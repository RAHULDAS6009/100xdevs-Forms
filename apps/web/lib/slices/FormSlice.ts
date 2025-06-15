import { PartialBlock } from "@blocknote/core";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface Form {
  id: string;
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
    addForm: (state, action: PayloadAction<Form[]>) => {
      state = action.payload;
      //create a api request.
    },
    editForm: (state, action: PayloadAction<Form>) => {
      //for adding blocks and update title ,cover page etc;

      const form: Form = state.find(
        (form: Form) => form.id == action.payload.id
      );
      if (form) {
        form.blocks = action.payload.blocks;
        form.title = action.payload.title;
        form.coverPage = action.payload.coverPage;
      }
    },
  },
});
export const { addForm, editForm } = FormSlice.actions;
export default FormSlice.reducer;
