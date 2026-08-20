import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getLLMResponse = async (
  message: string,
  context: string[],
  systemPrompt: string
): Promise<string> => {
  try {
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...context.map(msg => ({ role: 'user' as const, content: msg })),
      { role: 'user' as const, content: message }
    ];

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
      temperature: 0.8,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });

    const content = response.data.choices[0].message?.content;
    if (!content) {
      return "Hmm, samajh nahi aaya 🧐 thoda aur batao?";
    }

    // Ensure response is under 10 words (simplified check)
    const words = content.split(' ').length;
    if (words > 15) {
      // Truncate or shorten response
      const shortened = content.split(' ').slice(0, 12).join(' ') + '...';
      return shortened;
    }

    return content;
  } catch (error: any) {
    console.error('LLM Error:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenAI API key.');
    }
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};
