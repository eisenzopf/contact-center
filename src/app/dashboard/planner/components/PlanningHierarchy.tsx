import { Plus, ChevronDown, ChevronRight, Activity, MessageSquare } from 'lucide-react';
import { themeClasses } from '@/lib/theme';
import { Section } from './Section';
import { Hierarchy } from '../types';

interface PlanningHierarchyProps {
  hierarchy: Hierarchy;
  setHierarchy: (hierarchy: Hierarchy) => void;
  onToolClick: (tool: any) => void;
  activeView: string;
}

export const PlanningHierarchy = ({ 
  hierarchy, 
  setHierarchy, 
  onToolClick, 
  activeView 
}: PlanningHierarchyProps) => {
  const toggleExpand = (sectionId: string, itemId: number) => {
    console.log('Toggling item:', itemId, 'in section:', sectionId);
    setHierarchy(prev => {
      return {
        ...prev,
        sections: prev.sections.map(section => 
          section.id === sectionId
            ? {
                ...section,
                items: section.items.map(item =>
                  item.id === itemId
                    ? { ...item, expanded: !item.expanded }
                    : item
                )
              }
            : section
        )
      };
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
            {hierarchy.tools?.map(tool => (
              <div
                key={tool.id}
                onClick={() => onToolClick(tool)}
                className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
                  activeView === tool.path ? 'bg-gray-50' : ''
                }`}
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
          <div 
            className={`p-2 hover:bg-gray-50 rounded cursor-pointer ${
              activeView === 'chat' ? 'bg-gray-50' : ''
            }`}
            onClick={() => onToolClick({ path: 'chat' })}
          >
            <span className={themeClasses.textPrimary}>Chat Interface</span>
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