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
  render?: React.ReactNode;
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

export interface FunctionDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

export interface Tool {
  type: "function";
  function: FunctionDefinition;
}

export interface LLMRequestWithFunctions extends LLMRequest {
  tools: Tool[];
  tool_choice?: string | null;
}

export interface FunctionCall {
  name: string;
  arguments: string;
}

export interface AssistantMessage extends ChatMessage {
  tool_calls?: {
    id: string;
    type: "function";
    function: FunctionCall;
  }[];
} 