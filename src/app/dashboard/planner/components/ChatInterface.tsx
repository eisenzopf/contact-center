import { Send } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { useEffect, useRef } from 'react';

interface ChatInterfaceProps {
  chat: ChatMessageType[];
  setChat: (chat: ChatMessageType[]) => void;
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInterface = ({ 
  chat, 
  setChat, 
  message, 
  setMessage, 
  onSendMessage,
  isLoading 
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isLoading]); // Scroll when messages change or loading state changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Chat Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {chat.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="inline-block max-w-[80%] p-3 rounded-lg bg-[var(--card-background)] border border-[var(--card-border)]">
                <div className="flex items-center space-x-3">
                  <span className={`text-gray-500`}>Thinking</span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>
      </div>

      {/* Chat Input - Fixed at Bottom */}
      <div className="flex-shrink-0 border-t border-[var(--card-border)] bg-[var(--background)] p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 min-w-0 px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isLoading || !message.trim()}
            className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center disabled:opacity-50 disabled:hover:bg-blue-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};