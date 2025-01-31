export interface HierarchyItem {
  id: number;
  title: string;
  expanded: boolean;
  details?: string;
  subtasks?: SubTask[];
  metrics?: Metric[];
}

export interface Section {
  id: string;
  title: string;
  expanded: boolean;
  items: HierarchyItem[];
}

export interface SubTask {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Metric {
  id: number;
  title: string;
  value: string;
  status: 'on-track' | 'at-risk' | 'behind';
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
} 