import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MoreVertical } from 'lucide-react';
import Avatar from '../common/Avatar';

interface ChatHeaderProps {
  onCallToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onCallToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex items-center gap-3">
          <Avatar name="Sapna" size="medium" />
          <div>
            <h2 className="font-semibold text-gray-800">Sapna</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600">Active now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCallToggle}
          className="p-2 rounded-full hover:bg-green-100 transition-colors touch-manipulation"
          aria-label="Call"
        >
          <Phone className="w-5 h-5 text-green-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
