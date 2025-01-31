import { Send } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

export const ChatInterface = ({ chat, setChat, message, setMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChat(prev => [...prev, { role: 'user', content: message }]);
      setMessage('');
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
            className="flex-1 min-w-0 px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  return (
    <div 
      className={`mb-4 ${
        message.role === 'system' ? '' :
        message.role === 'user' ? 'flex justify-end' : ''
      }`}
    >
      <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
        message.role === 'system' ? 'bg-[var(--card-background)] border border-[var(--card-border)]' :
        message.role === 'user' ? 'bg-blue-500 text-white' :
        'bg-[var(--background)] border border-[var(--card-border)]'
      }`}>
        {message.content}
      </div>
    </div>
  );
}; 