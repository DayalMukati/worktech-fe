import authSlice from './authSlice';
import layoutSlice from './layoutSlice';
import orgSlice from './orgSlice';
import spacesSlice from "./spacesSlice";
import leaderboardSlice from './leaderboardSlice';
const rootReducer = {
  layoutSlice,
  authSlice,
  orgSlice,
  spacesSlice,
  leaderboardSlice,
};
export default rootReducer;
