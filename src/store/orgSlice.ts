import { Orgs } from '@/graphql/__generated__/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrgState {
	orgs: Orgs[]; // Use Orgs[] directly for typing the array of organizations
}

const initialState: OrgState = {
	orgs: []
};

export const orgSlice = createSlice({
	name: 'org', // Corrected the name to 'org' to reflect the slice's purpose
	initialState,
	reducers: {
		createOrg: (state, action: PayloadAction<Orgs>) => {
			state.orgs.push(action.payload);
		},
		loadOrgs: (state, action: PayloadAction<Orgs[]>) => {
			// Directly use Orgs[] for the payload type
			state.orgs = action.payload;
		}
	}
});

export const { createOrg, loadOrgs } = orgSlice.actions;

export const selectOrg = (state: { orgSlice: OrgState }) =>
	state.orgSlice;

export default orgSlice.reducer;
