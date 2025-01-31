import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Convert newlines to <br> tags
  const formattedContent = message.content.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i !== message.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-[var(--card-background)] border border-[var(--card-border)]'
      }`}>
        {formattedContent}
      </div>
    </div>
  );
}; 