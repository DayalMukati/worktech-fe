import { SessionOptions } from 'iron-session';

export interface SessionData {
	username: string;
	walletAddress: string;
	authToken?: string;
	_id?: string;
}

export const defaultSession: SessionData = {
	username: '',
	walletAddress: ''
};

export const sessionOptions: SessionOptions = {
	password: 'complex_password_at_least_32_characters_long',
	cookieName: 'work-tech/',
	cookieOptions: {
		// secure only works in `https` environments
		// if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
		secure: true
	}
};
