import React, { useEffect, useState } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { responseHandlerService } from '../services/responseHandlers';
import { HandlerResult } from '../types/handlers';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [renderedContent, setRenderedContent] = useState<React.ReactNode | string>(message.content);

  useEffect(() => {
    const renderMessage = async () => {
      try {
        const result = await responseHandlerService.handleResponse(message);
        setRenderedContent(result.render || result.content);
      } catch (error) {
        console.error('Error rendering message:', error);
        setRenderedContent(message.content);
      }
    };

    renderMessage();
  }, [message]);

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-[var(--card-background)] border border-[var(--card-border)]'
      }`}>
        {renderedContent}
      </div>
    </div>
  );
}; 