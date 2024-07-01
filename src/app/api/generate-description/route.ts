import { NextRequest, NextResponse } from 'next/server';
import { OPENAI_API_KEY } from '@/conf/config';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
	try {
		const { title } = await req.json();
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{
					role: 'user',
					content: `Generate a description for the title: ${title}`
				}
			]
		});

		const description =
			chatCompletion.choices[0].message.content?.trim() || '';
		return NextResponse.json({ description });
	} catch (error) {
		console.error('Error generating description:', error);
		return NextResponse.error();
	}
}
