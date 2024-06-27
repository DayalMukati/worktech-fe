import { User } from '@/graphql/__generated__/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	user?: User | null;
	authToken?: string | null;
	walletAddress?: string | null;
	web3?: any | null;
}

const initialState: AuthState = {
	walletAddress: '',
	web3: null,
	user: null,
	authToken: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loadUser: (state, action: PayloadAction<User>) => {
			state.user = {
				...state.user,
				...action.payload
			};
		},
		setWeb3: (
			state,
			action: PayloadAction<{ web3?: any; walletAddress?: string }>
		) => {
			state.walletAddress = action.payload.walletAddress;
			state.web3 = action.payload.web3;
		},
		// handleLogin: (state, action: PayloadAction<{ user: User }>) => {
		// 	// console.log({ payload: action.payload });
		// 	state.user = {
		// 		...state.user,
		// 		...action.payload.user
		// 	};
		// },
		handleLogin: (
			state,
			action: PayloadAction<{ token: string; user: User }>
		) => {
			console.log({ payload: action.payload });
			state.authToken = action.payload.token;
			state.user = {
				...state.user,
				...action.payload.user
			};
		},
		logoutUser: state => {
			state.authToken = initialState.authToken;
			state.user = initialState.user;
			state.web3 = null;
			state.walletAddress = null;
		}
	}
});

export const { handleLogin, logoutUser, loadUser, setWeb3 } =
	authSlice.actions;
export const selectUserAuth = (state: { authSlice: AuthState }) =>
	state.authSlice;
export default authSlice.reducer;
