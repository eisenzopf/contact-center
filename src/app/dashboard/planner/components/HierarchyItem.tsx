import { ChevronDown, ChevronRight } from 'lucide-react';
import { themeClasses } from '@/lib/theme';
import { HierarchyItem as HierarchyItemType } from '../types';

interface HierarchyItemProps {
  item: HierarchyItemType;
  onToggle: (sectionId: string, itemId: number) => void;
  sectionId: string;
}

export const HierarchyItem = ({ item, onToggle, sectionId }: HierarchyItemProps) => {
  return (
    <div className="space-y-2">
      <div 
        className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
        onClick={() => onToggle(sectionId, item.id)}
      >
        <button 
          className="mt-1 group-hover:bg-gray-100 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(sectionId, item.id);
          }}
        >
          {item.expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </button>
        <div className="flex-1">
          <p className={themeClasses.textPrimary}>{item.title}</p>
          {item.expanded && (
            <div className="mt-2 space-y-2">
              <p className={`text-sm ${themeClasses.textSecondary}`}>{item.description}</p>
              <div className="space-y-1 text-sm">
                <p>📅 Due: {new Date(item.deadline).toLocaleDateString()}</p>
                <p>🎯 Priority: {item.priority}/5</p>
                <p>📊 Progress: {item.baseline}% → {item.target}%</p>
              </div>
              {item.subtasks && (
                <div className="mt-3 space-y-1">
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
          )}
        </div>
      </div>
    </div>
  );
}; 