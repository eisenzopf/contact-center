import { 
  MessageTransformation, 
  PreparedMessage, 
  ChatMessage, 
  LLMRequestWithFunctions,
  LLMRequestMessage,
  Tool
} from '../types/messages';
import semantics from '@/semantics.json';

const SYSTEM_PROMPT = `You are an AI assistant that helps with planning and analysis. You can create charts, reports, and goals to help visualize and track progress. When appropriate, use the available functions to create visual representations of data or structured information.`;

export class MessagePreparationService {
  private functions: Record<string, any>;

  constructor() {
    this.functions = semantics.functions;
  }

  prepareMessage(message: string): PreparedMessage {
    return {
      originalContent: message,
      transformedContent: message,
      appliedTransformations: []
    };
  }

  prepareLLMRequest(
    chat: ChatMessage[], 
    newMessage: string
  ): LLMRequestWithFunctions {
    const messages: LLMRequestMessage[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      ...chat.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: newMessage
      }
    ];

    const tools: Tool[] = Object.entries(this.functions).map(([name, func]) => ({
      type: "function",
      function: {
        name,
        description: func.description,
        parameters: func.parameters
      }
    }));

    return {
      model: 'deepseek-r1-distill-qwen-14b',
      messages,
      temperature: 0.7,
      max_tokens: -1,
      stream: false,
      tools
    };
  }
}

// Create and export a singleton instance
export const messagePreparationService = new MessagePreparationService(); 