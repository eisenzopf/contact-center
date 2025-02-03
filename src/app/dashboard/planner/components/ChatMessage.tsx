import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { responseHandlerService } from '../services/responseHandlers';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const renderContent = () => {
    try {
      const result = responseHandlerService.handleResponse(message.content);
      return result.render || result.content;
    } catch (error) {
      console.error('Error rendering message:', error);
      return message.content;
    }
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-[var(--card-background)] border border-[var(--card-border)]'
      }`}>
        {renderContent()}
      </div>
    </div>
  );
}; 