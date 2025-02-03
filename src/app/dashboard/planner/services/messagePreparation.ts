import { 
  MessageTransformation, 
  PreparedMessage, 
  ChatMessage, 
  LLMRequest,
  LLMRequestMessage 
} from '../types/messages';
import { getTransformations } from './transformations';

export class MessagePreparationService {
  private transformations: MessageTransformation[];

  constructor() {
    this.transformations = getTransformations();
  }

  prepareMessage(message: string): PreparedMessage {
    const appliedTransformations: string[] = [];
    let transformedContent = message;

    for (const transformation of this.transformations) {
      if (transformation.check(message)) {
        transformedContent = transformation.transform(transformedContent);
        appliedTransformations.push(transformation.keyword);
      }
    }

    return {
      originalContent: message,
      transformedContent,
      appliedTransformations
    };
  }

  prepareLLMRequest(
    chat: ChatMessage[], 
    newMessage: string
  ): LLMRequest {
    const prepared = this.prepareMessage(newMessage);
    
    const messages: LLMRequestMessage[] = chat.map((msg, index) => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the new message with potentially transformed content
    messages.push({
      role: 'user',
      content: prepared.transformedContent
    });

    return {
      model: 'deepseek-r1-distill-qwen-14b',
      messages,
      temperature: 0.7,
      max_tokens: -1,
      stream: false
    };
  }
}

// Create a singleton instance
export const messagePreparationService = new MessagePreparationService(); 