import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { defaultSession, sessionOptions } from '@/lib/session';
import { SessionData } from '@/lib/session';

// login
export async function POST(request: NextRequest) {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	const {
		username = 'No username',
		authToken,
		walletAddress,
		_id
	} = (await request.json()) as {
		username: string;
		authToken: string;
		walletAddress: string;
		_id?: string;
	};
   console.log("id", _id);
   session.username = username;
   session.authToken = authToken;
   session.walletAddress = walletAddress;
   session._id = _id;
   
	console.log('session:', session);

	await session.save();

	return Response.json(session);
}

export async function PATCH() {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);
	// do the update operations here

	// update the session
	session.updateConfig({
		...sessionOptions,
		cookieOptions: {
			...sessionOptions.cookieOptions,
			expires: new Date('2024-12-27T00:00:00.000Z'),
			maxAge: undefined
		}
	});
	await session.save();

	return Response.json(session);
}

// read session
export async function GET() {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	// simulate looking up the user in db

	if (!session.walletAddress) {
		return Response.json(defaultSession);
	}

	return Response.json(session);
}

// logout
export async function DELETE() {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	session.destroy();

	return Response.json(defaultSession);
}
