import { Router, Request, Response } from 'express';
import { getLLMResponse } from '../services/llmService';

const router = Router();

router.post('/send', async (req: Request, res: Response) => {
  try {
    const { message, context, systemPrompt } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!systemPrompt) {
      return res.status(400).json({ error: 'System prompt is required' });
    }

    const response = await getLLMResponse(message, context || [], systemPrompt);
    res.json({ response });
  } catch (error: any) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      fallback: "Arey yaar, thoda technical problem hai 😅 try karo phir se?",
      details: error.message
    });
  }
});

export default router;
