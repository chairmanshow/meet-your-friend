import React from 'react';
import { Message } from '../../types';
import { formatTime } from '../../utils/helpers';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isSapna = message.sender === 'sapna';

  return (
    <div className={`flex flex-col ${isSapna ? 'items-start' : 'items-end'} gap-1`}>
      <div
        className={`${
          isSapna ? 'chat-bubble-sapna' : 'chat-bubble-user'
        } shadow-sm`}
      >
        <p className="text-sm break-words">{message.content}</p>
      </div>
      <span className="text-xs text-gray-400 px-2">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

export default MessageBubble;
