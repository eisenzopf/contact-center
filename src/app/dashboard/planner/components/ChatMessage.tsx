import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChartRenderer } from './ChartRenderer';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Try to parse chart data if it exists
  const renderContent = () => {
    try {
      if (typeof message.content === 'string' && message.content.includes('CHART_DATA:')) {
        const parts = message.content.split('CHART_DATA:');
        const textContent = parts[0].trim();
        const chartData = JSON.parse(parts[1]);
        
        return (
          <>
            {textContent && <p className="mb-4">{textContent}</p>}
            <ChartRenderer data={chartData} />
          </>
        );
      }
      
      // Regular text message
      const formattedContent = message.content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== message.content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
      
      return formattedContent;
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