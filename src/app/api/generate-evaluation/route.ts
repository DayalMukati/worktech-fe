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
						'You are an AI evaluator. Your task is to evaluate a proposal based on its description and criteria. Provide a score from 1 to 10, where 10 is the highest. Then, list 5 key points justifying the score. Format your evaluation in markdown as shown below.'
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
					content: 'Please evaluate the proposal.'
				},
				{
					role: 'system',
					content:
						'Format your response as follows:\n\n# Evaluation and Score\n\n**Score:** [Your Score Here]\n\n**Justification:**\n1. [Reason 1]\n2. [Reason 2]\n3. [Reason 3]\n4. [Reason 4]\n5. [Reason 5]'
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
