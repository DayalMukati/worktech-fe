import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layout {
	isOrgCreationModalOpen: boolean;
	isMobile: boolean;
}

const initialState: Layout = {
	isOrgCreationModalOpen: false,
	isMobile: false
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState: initialState,
	reducers: {
		setOrgCreationModal: state => {
			state.isOrgCreationModalOpen = !state.isOrgCreationModalOpen;
		},

		setIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		}
	}
});

export const { setIsMobile } = layoutSlice.actions;
export const selectLayout = (state: { layoutSlice: Layout }) =>
	state.layoutSlice;
export default layoutSlice.reducer;
