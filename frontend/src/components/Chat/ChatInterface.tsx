import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Phone, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import ChatHeader from './ChatHeader';
import CallScreen from './CallScreen';
import EmojiPicker from 'emoji-picker-react';
import toast from 'react-hot-toast';

interface ChatInterfaceProps {
  isCallActive: boolean;
  onCallToggle: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isCallActive, onCallToggle }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { messages, sendMessage, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceMessage = () => {
    toast('🎤 Voice message feature coming soon!', {
      icon: '🎤',
    });
  };

  if (isCallActive) {
    return <CallScreen onEndCall={onCallToggle} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader onCallToggle={onCallToggle} />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 mt-20"
            >
              <div className="text-4xl mb-4">👋</div>
              <p>Start a conversation with Sapna</p>
              <p className="text-sm text-gray-400">She's always here to listen</p>
            </motion.div>
          )}
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageBubble message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 text-sm ml-4"
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span>Sapna is typing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/90 backdrop-blur-lg border-t border-gray-200">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label="Emoji picker"
          >
            <Smile className="w-6 h-6 text-gray-600" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
            maxLength={500}
          />

          <button
            onClick={handleVoiceMessage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label="Voice message"
          >
            <Mic className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={onCallToggle}
            className="p-2 rounded-full hover:bg-green-100 transition-colors touch-manipulation"
            aria-label="Call"
          >
            <Phone className="w-6 h-6 text-green-600" />
          </button>

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-2 rounded-full transition-all touch-manipulation ${
              message.trim()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 z-50 max-w-sm">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setMessage(prev => prev + emoji.emoji);
                setShowEmojiPicker(false);
                inputRef.current?.focus();
              }}
              theme="light"
              width="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
