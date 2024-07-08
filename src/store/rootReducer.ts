import authSlice from './authSlice';
import layoutSlice from './layoutSlice';
import orgSlice from './orgSlice';
import spacesSlice from "./spacesSlice";
import leaderboardSlice from './leaderboardSlice';
import UserSlice from './UserSlice';
const rootReducer = {
  layoutSlice,
  authSlice,
  orgSlice,
  spacesSlice,
  leaderboardSlice,
   UserSlice
   
};
export default rootReducer;
