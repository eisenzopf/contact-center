import React from 'react';
import { ResponseHandler, HandlerResult } from '../types/handlers';
import { ChartRenderer } from '../components/ChartRenderer';
import semantics from '@/semantics.json';

export class ResponseHandlerService {
  private handlers: ResponseHandler[];
  private appliedTransformations: string[];

  constructor() {
    this.handlers = this.initializeHandlers();
    this.appliedTransformations = [];
  }

  setAppliedTransformations(transformations: string[]) {
    this.appliedTransformations = transformations;
  }

  private initializeHandlers(): ResponseHandler[] {
    return Object.entries(semantics.chat).map(([key, value]) => ({
      keyword: key,
      check: (content: string) => content.includes(`${key.toUpperCase()}_DATA:`),
      process: (content: string) => this.processContent(key, content)
    }));
  }

  private extractData(content: string, prefix: string): { textContent: string, data: any } {
    const parts = content.split(`${prefix}_DATA:`);
    const textContent = parts[0].trim();
    let data = null;

    if (parts.length > 1) {
      try {
        const jsonStr = parts[1].split('\n')[0].trim();
        data = JSON.parse(jsonStr);
      } catch (error) {
        console.error(`Error parsing ${prefix}_DATA:`, error);
      }
    }

    return { textContent, data };
  }

  private processContent(type: string, content: string): HandlerResult {
    const prefix = type.toUpperCase();
    const { textContent, data } = this.extractData(content, prefix);

    switch (type) {
      case 'chart':
        return {
          type: 'chart',
          content: textContent,
          data,
          render: React.createElement(React.Fragment, null,
            textContent && React.createElement('p', { className: 'mb-4' }, textContent),
            React.createElement(ChartRenderer, { data: data })
          )
        };
      case 'tool':
        return {
          type: 'tool',
          content: textContent,
          data,
          render: React.createElement(React.Fragment, null,
            textContent && React.createElement('p', { className: 'mb-4' }, textContent),
            React.createElement('div', { className: 'bg-gray-50 p-4 rounded-lg' },
              React.createElement('h3', { className: 'font-medium' }, data.title),
              React.createElement('pre', { className: 'mt-2 text-sm' }, JSON.stringify(data.data, null, 2))
            )
          )
        };
      case 'report':
        return {
          type: 'report',
          content: textContent,
          data: data
        };
      default:
        return {
          type: 'text',
          content: content,
          render: React.createElement(React.Fragment, null,
            content.split('\n').map((line, i) => 
              React.createElement(React.Fragment, { key: i },
                line,
                i !== content.split('\n').length - 1 && React.createElement('br')
              )
            )
          )
        };
    }
  }

  handleResponse(content: string): HandlerResult {
    for (const transformation of this.appliedTransformations) {
      const handler = this.handlers.find(h => h.keyword === transformation);
      if (handler && handler.check(content)) {
        return handler.process(content);
      }
    }
    
    return { type: 'text', content };
  }
}

export const responseHandlerService = new ResponseHandlerService(); 