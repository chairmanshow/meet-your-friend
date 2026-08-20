import { useState, useCallback } from 'react';
import { Message } from '../types';
import { sendMessage as apiSendMessage } from '../services/api';

const SYSTEM_PROMPT = `You are Sapna, a friendly and caring friend from Morena, Madhya Pradesh. 
You speak in Hinglish naturally. Keep responses short (under 10 words). Use emojis naturally.
Be warm, supportive, and casual. Never mention being an AI or chatbot.
Character info should only be revealed when directly asked.
If you don't know something, say so honestly.
Keep the conversation flowing naturally like a real friend.`;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await apiSendMessage(content, messages, SYSTEM_PROMPT);

      const sapnaMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'sapna',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, sapnaMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Arey yaar, thoda technical problem hai 😅 try karo phir se?",
        sender: 'sapna',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return { messages, sendMessage, isTyping };
};
