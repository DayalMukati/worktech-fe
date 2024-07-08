import {  TaskDto,UserDto } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

interface profile {
  _id: string;
  name: string;
  description?: string | null;
  visibility: boolean | null;
  tasks?: TaskDto[] | null;
  users?: UserDto[] | null;

}

interface profilesState {
  profiles: profile[];
}

const initialState: profilesState = {
  profiles: [],
};

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: initialState,
  reducers: {
    setprofiles: (state, action: PayloadAction<{ profiles: any }>) => {
      state.profiles = action.payload.profiles;
    },
    createprofile: (state, action: PayloadAction<{ profile: profile }>) => {
      state.profiles.push(action.payload.profile);
    },
  },
});

export const { createprofile, setprofiles } = profilesSlice.actions;
export const selectprofiles = (state: { profilesSlice: profilesState }) =>
  state.profilesSlice;

export default profilesSlice.reducer;
