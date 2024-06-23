import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layout {
	isLeftSidebarOpen: boolean;
	isRightSidebarOpen: boolean;
	isShowingNav: boolean;
	isMobile: boolean;
	isWaitlistModalOpen: boolean;
	isLoginModalOpen: boolean;
	isForgetPasswordModalOpen: boolean;
}

const initialState: Layout = {
	isLeftSidebarOpen: false,
	isRightSidebarOpen: false,
	isShowingNav: true,
	isMobile: false,
	isWaitlistModalOpen: false,
	isLoginModalOpen: false,
	isForgetPasswordModalOpen: false
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState: initialState,
	reducers: {
		toggleLeftSidebar: state => {
			state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
		},
		toggleRightSidebar: state => {
			state.isRightSidebarOpen = !state.isRightSidebarOpen;
		},
		toggleNav: state => {
			state.isShowingNav = !state.isShowingNav;
		},
		setIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},
		setIsWaitListModalOpen: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.isWaitlistModalOpen = action.payload;
		},
		setIsLoginModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isLoginModalOpen = action.payload;
		},
		setIsForgetPasswordModalOpen: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.isForgetPasswordModalOpen = action.payload;
		}
	}
});

export const {
	toggleLeftSidebar,
	toggleRightSidebar,
	setIsMobile,
	toggleNav,
	setIsWaitListModalOpen,
	setIsLoginModalOpen,
	setIsForgetPasswordModalOpen
} = layoutSlice.actions;
export const selectLayout = (state: { layoutSlice: Layout }) =>
	state.layoutSlice;
export default layoutSlice.reducer;
