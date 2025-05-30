import { Block, PartialBlock } from "@blocknote/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Form {
  blocks: PartialBlock[];
}

const initialState: Form = {
  blocks: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<PartialBlock[]>) => {
      state.blocks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBlock } = formSlice.actions;

export default formSlice.reducer;
