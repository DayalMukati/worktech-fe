import { ListAllSpacesQuery, TaskDto } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

interface Activity {
  index: number;
  userId: string;
  activity: string;
  createdAt: string;
}

interface ActivityState {
  Activity: Activity[];
}

const initialState: ActivityState = {
  Activity: [],
};

export const activitySlice = createSlice({
  name: "Activity",
  initialState: initialState,
  reducers: {
    setActivity: (state, action: PayloadAction<{ Activity: any }>) => {
      state.Activity = action.payload.Activity;
    },
  },
});

export const { setActivity } = activitySlice.actions;
export const selectActivity = (state: { activitySlice: ActivityState }) =>
  state.activitySlice;

export default activitySlice.reducer;
