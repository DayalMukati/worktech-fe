import { GetLeaderboardQuery } from "@/graphql/__generated__/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

interface Space {

    rank: number;
    name: string;
    taskDone: number;
    Points: number;
    Earned: string;

}

interface leaderboardsState {
    leaderboards: Space[];
}

const initialState: leaderboardsState = {
    leaderboards: [],
};

export const leaderboardsSlice = createSlice({
    name: "leaderboards",
    initialState: initialState,
    reducers: {
        setLeaderboards: (state, action: PayloadAction<{ leaderboards: any }>) => {
            state.leaderboards = action.payload.leaderboards;
        },
        addSpace: (state, action: PayloadAction<{ space: any }>) => {
            state.leaderboards.push(action.payload.space);
        },
    },
});

export const { addSpace, setLeaderboards } = leaderboardsSlice.actions;
 

export default leaderboardsSlice.reducer;
