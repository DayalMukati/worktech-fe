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
						'You are an intelligent evaluator. Evaluate the given proposal based on the description and criteria provided. take the following data below.'
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
					content: `Evaluate the proposal in the following structure and in markdown (do not add any extra information): 
					
					### **Task Submitted By Assignee** 
					${proposal}

					### AI Reviewer's Evaluation and Score 

					here use the criteria to evaluate the proposal and assign a score from 1 to 10
					and give 5 reasoning short points for the score you have given
					
					`
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
