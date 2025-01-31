import { MessageSquarePlus } from 'lucide-react';

interface NewChatButtonProps {
  onClick: () => void;
}

export const NewChatButton = ({ onClick }: NewChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      title="Start New Chat"
    >
      <MessageSquarePlus className="h-5 w-5" />
    </button>
  );
}; 