import { NextRequest, NextResponse } from 'next/server';
import { OPENAI_API_KEY } from '@/conf/config';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
	try {
		const { description, proposal, criteria } = await req.json();
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo', // Use the appropriate model
			messages: [
				{
					role: 'system',
					content:
						'You are an intelligent evaluator. Evaluate the given proposal based on the description and criteria provided. Assign a score from 1 to 10, where 10 is the highest, and provide a summary of your reasoning behind the score.'
				},
				{
					role: 'user',
					content: `Description: ${description}`
				},
				{
					role: 'user',
					content: `Proposal: ${proposal}`
				},
				{
					role: 'user',
					content: `Criteria: ${criteria}`
				},
				{
					role: 'user',
					content: 'Evaluate the proposal.'
				}
			]
		});

		const evaluation =
			chatCompletion.choices[0].message.content?.trim() || '';
		return NextResponse.json({ evaluation });
	} catch (error) {
		console.error('Error generating evaluation:', error);
		return NextResponse.error();
	}
}
