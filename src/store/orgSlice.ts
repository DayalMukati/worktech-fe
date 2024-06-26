import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Org {
	name?: string;
}

interface OrgState {
	orgs: Org[];
}

const initialState: OrgState = {
	orgs: [
		{
			name: 'Organization 1'
		},
		{
			name: 'Organization 2'
		}
	]
};

export const orgSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		createOrg: (state, action: PayloadAction<{ org: Org }>) => {
			// console.log({ payload: action.payload });
			state.orgs.push(action.payload.org);
		},
		loadOrgs: (state, action: PayloadAction<{ orgs: Org[] }>) => {
			state.orgs = action.payload.orgs;
		}
	}
});

export const { createOrg } = orgSlice.actions;
export const selectOrg = (state: { orgSlice: OrgState }) =>
	state.orgSlice;
export default orgSlice.reducer;
