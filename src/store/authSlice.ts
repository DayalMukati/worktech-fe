import { User } from '@/graphql/__generated__/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
	username?: string;
	walletAddress?: string;
	web3?: any;
}

interface AuthState {
	user?: User | null;
	authToken?: string | null;
	walletAddress?: string | null;
	web3?: null;

	

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
		handleLogout: (state, action: PayloadAction<void>) => {
			state.authToken = initialState.authToken;
			state.user = initialState.user;
		}
	}
});

export const { handleLogin, handleLogout, loadUser } =
	authSlice.actions;
export const selectUserAuth = (state: { authSlice: AuthState }) =>
	state.authSlice;
export default authSlice.reducer;
