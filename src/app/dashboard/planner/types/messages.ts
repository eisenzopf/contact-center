export interface MessageTransformation {
  keyword: string;
  check: (message: string) => boolean;
  transform: (message: string) => string;
}

export interface PreparedMessage {
  originalContent: string;
  transformedContent: string;
  appliedTransformations: string[];
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMRequestMessage {
  role: string;
  content: string;
}

export interface LLMRequest {
  model: string;
  messages: LLMRequestMessage[];
  temperature: number;
  max_tokens: number;
  stream: boolean;
} 