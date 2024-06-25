import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layout {
	isOrgCreationModalOpen: boolean;
	isMobile: boolean;
	isLoginModalOpen: boolean;
	isSignupModalOpen: boolean;
}

const initialState: Layout = {
	isOrgCreationModalOpen: false,
	isLoginModalOpen: false,
	isSignupModalOpen: false,
	isMobile: false
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState: initialState,
	reducers: {
		setOrgCreationModal: (state, action: PayloadAction<boolean>) => {
			state.isOrgCreationModalOpen = action.payload;
		},

		setIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},
		setIsLoginModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isLoginModalOpen = action.payload;
		},
		setIsSignupModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isSignupModalOpen = action.payload;
		}
	}
});

export const {
	setIsMobile,
	setOrgCreationModal,
	setIsLoginModalOpen,
	setIsSignupModalOpen
} = layoutSlice.actions;
export const selectLayout = (state: { layoutSlice: Layout }) =>
	state.layoutSlice;
export default layoutSlice.reducer;
