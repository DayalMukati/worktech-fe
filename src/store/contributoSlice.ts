import {  ListAllInterestedContributorsQuery, TaskDto,UserDto } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

interface Contibutor {
  _id: string;
  name: string;
  description?: string | null;
  visibility: boolean | null;
  tasks?: TaskDto[] | null;
  users?: UserDto[] | null;

}

interface contibutorsState {
  contibutors: Contibutor[];
}

const initialState: contibutorsState = {
  contibutors: [],
};

export const contibutorsSlice = createSlice({
  name: "contibutors",
  initialState: initialState,
  reducers: {
    setcontibutors: (state, action: PayloadAction<{ contibutors: any }>) => {
      state.contibutors = action.payload.contibutors;
    },
    createContibutor: (state, action: PayloadAction<{ contibutor: Contibutor }>) => {
      state.contibutors.push(action.payload.contibutor);
    },
  },
});

export const { createContibutor, setcontibutors } = contibutorsSlice.actions;
export const selectcontibutors = (state: { contibutorsSlice: contibutorsState }) =>
  state.contibutorsSlice;

export default contibutorsSlice.reducer;
