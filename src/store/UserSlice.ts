import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Education {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
}
interface FeatureWork {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  skills: string[];
  responsibilities?: string;
  description?: string;
}
export interface UserState {
  user: {
    _id: string;
    bio?: string;
    github?: string;
    linkedIn?: string;
    twitter?: string;
    discord?: string;
    status?: number;
    email?: string;
    featureWork:FeatureWork[];
    education: Education[];   
    reputationScore:string;
    revenueShare:string;
    earnings:string;
  };
}

const initialState: UserState = {
  user: {
    _id: '',
    bio: '',
    github: '',
    linkedIn: '',
    twitter: '',
    discord: '',
    status: 0,
    email: '',
    featureWork: [],
    education: [], 
    reputationScore:"",
    revenueShare:'',
    earnings:""  
  }
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<UserState['user']>) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    addFeatureWork(state, action: PayloadAction<UserState['user']['featureWork']>) {
      state.user.featureWork = action.payload;
    },
    updateFeatureWork(
      state,
      action: PayloadAction<{ index: number; updatedFeatureWork: FeatureWork }>
    ) {
      const { index, updatedFeatureWork } = action.payload;
      if (index >= 0 && index < state.user.featureWork.length) {
        state.user.featureWork[index] = updatedFeatureWork;
      }
    },
    deleteFeatureWork(state, action: PayloadAction<number>) {
      state.user.featureWork = state.user.featureWork.filter(
        (_, i) => i !== action.payload
      );
    },
    addEducation(state, action: PayloadAction<Education>) {
      state.user.education.push(action.payload);
    },
    updateEducation(state, action: PayloadAction<{ index: number, updatedEducation: Education }>) {
      const { index, updatedEducation } = action.payload;
      if (index >= 0 && index < state.user.education.length) {
        state.user.education[index] = updatedEducation;
      }
    },
    deleteEducation(state, action: PayloadAction<{ index: number }>) {
      state.user.education = state.user.education?.filter((_, i) => i !== action.payload.index);
    },
  },
});

export const { setUser, updateUser, addFeatureWork, updateFeatureWork, addEducation, updateEducation,deleteEducation,deleteFeatureWork } = UserSlice.actions;

export default UserSlice.reducer;
