import { ListAllSpacesQuery, TaskDto } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

interface Space {
  _id: string;
  name: string;
  description?: string | null;
  visibility: boolean | null;
  tasks?: TaskDto[] | null;
}

interface spacesState {
  spaces: Space[];
}

const initialState: spacesState = {
  spaces: [],
};

export const spacesSlice = createSlice({
  name: "spaces",
  initialState: initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<{ spaces: any }>) => {
      state.spaces = action.payload.spaces;
    },
    createSpace: (state, action: PayloadAction<{ space: Space }>) => {
      state.spaces.push(action.payload.space);
    },
  },
});

export const { createSpace, setSpaces } = spacesSlice.actions;
export const selectSpaces = (state: { spacesSlice: spacesState }) =>
  state.spacesSlice;

export default spacesSlice.reducer;
