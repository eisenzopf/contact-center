import { MessageTransformation } from '../types/messages';
import semantics from '@/semantics.json';

export const createTransformationFromSemantic = (
  key: string, 
  semantic: any
): MessageTransformation => ({
  keyword: key,
  check: (message: string) => message.toLowerCase().includes(key),
  transform: (message: string) => `${semantic.description}\n${semantic.data}\n${message}`
});

export const getTransformations = (): MessageTransformation[] => {
  return Object.entries(semantics.chat).map(
    ([key, value]) => createTransformationFromSemantic(key, value)
  );
}; 