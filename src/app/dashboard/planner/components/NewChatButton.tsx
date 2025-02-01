import { MessageSquarePlus } from 'lucide-react';

interface NewChatButtonProps {
  onClick: () => void;
}

export const NewChatButton = ({ onClick }: NewChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-[var(--foreground)] hover:bg-[var(--card-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--card-border)]"
      title="Start New Chat"
    >
      <MessageSquarePlus className="h-5 w-5" />
    </button>
  );
}; 