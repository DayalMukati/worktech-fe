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
						'Provide a concise evaluation of the proposal, including a score and key points for justification. Start with outputting the original proposal formatted in markdown.'
				},
				{
					role: 'user',
					content: `**Original Proposal**\n\n**Description:** ${description}\n\n**Proposal:** ${proposal}\n\n**Criteria:** ${criteria}`
				},
				{
					role: 'user',
					content: 'Evaluate the proposal.'
				},
				{
					role: 'system',
					content:
						'First, repeat the original proposal provided. Then, proceed with the evaluation.\n\n# Original Proposal\n\n  [Proposal Here]\n\n # Evaluation\n\n**Score:** [Your Score Here]\n\n## Justification\n1. [Reason 1]\n2. [Reason 2]\n3. [Reason 3]\n4. [Reason 4]\n5. [Reason 5]'
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
