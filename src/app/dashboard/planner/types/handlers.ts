export interface HandlerResult {
  type: 'text' | 'chart' | 'tool' | 'report' | 'observation' | 'plan' | 'action' | 'insight' | 'goal';
  content: string;
  data?: any;
  render?: React.ReactNode;
} 