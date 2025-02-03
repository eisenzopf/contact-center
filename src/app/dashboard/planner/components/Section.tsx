import { HierarchyItem } from './HierarchyItem';
import { themeClasses } from '@/lib/theme';
import { Section as SectionType } from '../types';

interface SectionProps {
  section: SectionType;
  onToggle: (sectionId: string, itemId: number) => void;
}

export const Section = ({ section, onToggle }: SectionProps) => {
  return (
    <div className="mb-6">
      <h3 className={`font-medium mb-2 ${themeClasses.textPrimary}`}>
        {section.title}
      </h3>
      <div className="space-y-2">
        {section.items.map(item => (
          <HierarchyItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            sectionId={section.id}
          />
        ))}
      </div>
    </div>
  );
}; 