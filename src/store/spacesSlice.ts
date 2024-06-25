import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface spaces {
  name?: string;
  visibility?: boolean;
}

interface spacesState {
  spaces: spaces[];
}

const initialState: spacesState = {
  spaces: [
    {
      name: "Developer challenges",
      visibility: false,
    },
    {
      name: "Community Contributions",
      visibility: false,
    },
  ],
};

export const spacesSlice = createSlice({
  name: "spaces",
  initialState: initialState,
  reducers: {
    createSpace: (state, action: PayloadAction<{ space: spaces }>) => {
      state.spaces.push(action.payload.space);
    },
  },
});

export const { createSpace } = spacesSlice.actions;
export const selectSpaces = (state: { spacesSlice: spacesState }) =>
  state.spacesSlice;

export default spacesSlice.reducer;
