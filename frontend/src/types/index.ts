export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'sapna';
  timestamp: string;
}

export interface CharacterMemory {
  name: string;
  city: string;
  state: string;
  personality: string;
  favoriteColor: string;
  favoriteFood: string;
  hobbies: string[];
  favoriteMusic: string;
  dailyRoutine: string;
  birthday: string;
  petName?: string;
  favoriteMovie?: string;
  dream?: string;
}

export interface Photo {
  id: string;
  url: string;
  createdAt: string;
}

export interface ChatContext {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
}
