import { NextRequest, NextResponse } from 'next/server';
import { OPENAI_API_KEY } from '@/conf/config';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
	try {
		const { feature } = await req.json();
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content:
						'You are a helpful assistant who generates detailed acceptance criteria for software features.'
				},
				{
					role: 'user',
					content: `Generate acceptance criteria for the feature: ${feature}`
				}
			]
		});

		const acceptanceCriteria =
			chatCompletion.choices[0].message.content?.trim() || '';
		return NextResponse.json({ acceptanceCriteria });
	} catch (error) {
		console.error('Error generating acceptance criteria:', error);
		return NextResponse.error();
	}
}
