import { Plus, ChevronDown, ChevronRight, Activity, MessageSquare } from 'lucide-react';
import { themeClasses } from '@/lib/theme';
import { Section as SectionType, HierarchyItem as HierarchyItemType, Tool, ChatHistory } from '../types';

export const PlanningHierarchy = ({ hierarchy, setHierarchy }) => {
  const toggleExpand = (sectionId, itemId) => {
    setHierarchy(prev => {
      const newHierarchy = { ...prev };
      const section = newHierarchy.sections.find(s => s.id === sectionId);
      if (section) {
        const item = section.items.find(i => i.id === itemId);
        if (item) {
          item.expanded = !item.expanded;
        }
      }
      return newHierarchy;
    });
  };

  return (
    <div className="w-full h-full border-b lg:border-b-0 lg:border-r border-[var(--card-border)] pb-6 lg:pb-0 lg:pr-6 overflow-y-auto">
      <div className="space-y-6">
        {hierarchy.sections.map(section => (
          <Section 
            key={section.id} 
            section={section} 
            onToggle={toggleExpand}
          />
        ))}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-gray-500" />
            <h3 className={`font-medium ${themeClasses.textPrimary}`}>Tools</h3>
          </div>
          <div className="space-y-2">
            {hierarchy.tools.map(tool => (
              <div
                key={tool.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${
                  tool.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className={themeClasses.textPrimary}>{tool.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <h3 className={`font-medium ${themeClasses.textPrimary}`}>Chats</h3>
          </div>
          <div className="space-y-2">
            {hierarchy.chatHistory.map(chat => (
              <div
                key={chat.id}
                className="flex flex-col p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <span className={themeClasses.textPrimary}>{chat.title}</span>
                <span className={`text-xs ${themeClasses.textSecondary}`}>
                  {chat.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ section, onToggle }: { section: SectionType; onToggle: (sectionId: string, itemId: number) => void }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-medium ${themeClasses.textPrimary}`}>{section.title}</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Plus className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      <div className="space-y-2">
        {section.items.map(item => (
          <Item 
            key={item.id} 
            item={item} 
            sectionId={section.id}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

const Item = ({ item, sectionId, onToggle }: { 
  item: HierarchyItemType; 
  sectionId: string; 
  onToggle: (sectionId: string, itemId: number) => void 
}) => {
  return (
    <div className="pl-2">
      <div 
        className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
        onClick={() => onToggle(sectionId, item.id)}
      >
        <button className="mt-1">
          {item.expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </button>
        <div>
          <p className={themeClasses.textPrimary}>{item.title}</p>
          {item.details && (
            <p className={`text-sm ${themeClasses.textSecondary}`}>{item.details}</p>
          )}
          {item.expanded && item.subtasks && (
            <div className="mt-2 space-y-1">
              {item.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    subtask.status === 'completed' ? 'bg-green-500' :
                    subtask.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                  <span className={themeClasses.textSecondary}>{subtask.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 