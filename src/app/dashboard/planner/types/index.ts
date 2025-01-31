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
  
export interface ChartData {
labels: string[];
datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
}[];
}

export interface Tool {
  id: number;
  title: string;
  type: 'scorecard' | 'monitoring' | 'practice';
  status?: 'active' | 'inactive';
}

export interface ChatHistory {
  id: number;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
}

export interface Hierarchy {
  sections: Section[];
  tools: Tool[];
  chatHistory: ChatHistory[];
}