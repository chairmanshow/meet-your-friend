const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const sendMessage = async (
  message: string,
  context: any[],
  systemPrompt: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context: context.map(msg => msg.content),
        systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
