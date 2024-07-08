import authSlice from "./authSlice";
import layoutSlice from "./layoutSlice";
import orgSlice from "./orgSlice";
import spacesSlice from "./spacesSlice";
import leaderboardSlice from "./leaderboardSlice";
import taskSlice from "./taskSlice";
import activitiesSlice from "./activities";
 import UserSlice from './UserSlice';
const rootReducer = {
  layoutSlice,
  authSlice,
  orgSlice,
  spacesSlice,
  leaderboardSlice,
  taskSlice,
  activitiesSlice,
   UserSlice
   
};
export default rootReducer;
