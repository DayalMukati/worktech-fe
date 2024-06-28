import { OPENAI_API_KEY } from '@/conf/config';
import OpenAI from 'openai';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY // Assuming OPENAI_API_KEY is imported or defined elsewhere
});

export async function generateDescription(
	title: string
): Promise<string> {
	try {
		// Use the chat completion API to generate a description based on the title
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo', // Specify the model you want to use
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{
					role: 'user',
					content: `Generate a description for the title: ${title}`
				}
			]
		});

		// Extract the generated description from the response
		const description =
			chatCompletion.choices[0].message.content?.trim() || '';
		return description;
	} catch (error) {
		console.error('Error generating description:', error);
		throw error;
	}
}

export async function generateAcceptanceCriteria(
	feature: string
): Promise<string> {
	try {
		// Use the chat completion API to generate acceptance criteria based on the feature description
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo', // Specify the model you want to use
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

		// Extract the generated acceptance criteria from the response
		const acceptanceCriteria =
			chatCompletion.choices[0].message.content?.trim() || '';
		return acceptanceCriteria;
	} catch (error) {
		console.error('Error generating acceptance criteria:', error);
		throw error;
	}
}
