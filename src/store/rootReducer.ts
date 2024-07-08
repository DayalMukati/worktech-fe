import authSlice from './authSlice';
import layoutSlice from './layoutSlice';
import orgSlice from './orgSlice';
import spacesSlice from "./spacesSlice";
import leaderboardSlice from './leaderboardSlice';
import profileSlice from "./profileSlice"
const rootReducer = {
  layoutSlice,
  authSlice,
  orgSlice,
  spacesSlice,
  leaderboardSlice,
  profileSlice,
};
export default rootReducer;
