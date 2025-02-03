import React from 'react';
import { HandlerResult } from '../types/handlers';
import { AssistantMessage } from '../types/messages';
import { ChartRenderer } from '../components/ChartRenderer';

export class ResponseHandlerService {
  private appliedTransformations: string[] = [];

  setAppliedTransformations(transformations: string[]) {
    this.appliedTransformations = transformations;
  }

  async handleResponse(message: AssistantMessage): Promise<HandlerResult> {
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      return await this.executeFunctionCall(toolCall);
    }
    
    return {
      type: 'text',
      content: message.content,
      render: this.renderTextContent(message.content)
    };
  }

  private async executeFunctionCall(toolCall: any): Promise<HandlerResult> {
    const { name, arguments: args } = toolCall.function;
    console.log('Raw arguments:', args);
    const parsedArgs = JSON.parse(args);
    console.log('Parsed arguments:', parsedArgs);

    switch (name) {
      case 'create_chart':
        return {
          type: 'chart',
          content: '',
          data: parsedArgs,
          render: React.createElement(ChartRenderer, { data: parsedArgs })
        };

      case 'create_goal':
        const formattedContent = [
          `📋 Goal Created: ${parsedArgs.title}`,
          `📝 Description: ${parsedArgs.description}`,
          `📅 Deadline: ${new Date(parsedArgs.deadline).toLocaleDateString()}`,
          `🎯 Priority: ${parsedArgs.priority}/5`,
          `📊 Baseline: ${parsedArgs.baseline}%`,
          `🎯 Target: ${parsedArgs.target}%`
        ].join('\n');

        return {
          type: 'goal',
          content: formattedContent,
          data: parsedArgs,
          render: React.createElement('div', { className: 'bg-[var(--card-background)] p-4 rounded-lg border border-[var(--card-border)]' },
            React.createElement('h3', { className: 'font-medium text-lg mb-3' }, parsedArgs.title),
            React.createElement('div', { className: 'space-y-2' },
              React.createElement('p', null, `📝 ${parsedArgs.description}`),
              React.createElement('p', null, `📅 Due: ${new Date(parsedArgs.deadline).toLocaleDateString()}`),
              React.createElement('div', { className: 'flex items-center gap-2' },
                React.createElement('span', null, '🎯 Priority:'),
                React.createElement('div', { className: 'flex gap-1' },
                  [...Array(parsedArgs.priority)].map((_, i) => 
                    React.createElement('div', { 
                      key: i,
                      className: 'w-2 h-2 bg-blue-500 rounded-full'
                    })
                  )
                )
              ),
              React.createElement('div', { className: 'mt-4 space-y-2' },
                React.createElement('div', { className: 'flex justify-between' },
                  React.createElement('span', null, 'Current:'),
                  React.createElement('span', { className: 'font-medium' }, `${parsedArgs.baseline}%`)
                ),
                React.createElement('div', { className: 'flex justify-between' },
                  React.createElement('span', null, 'Target:'),
                  React.createElement('span', { className: 'font-medium' }, `${parsedArgs.target}%`)
                )
              )
            )
          )
        };

      case 'generate_report':
        return {
          type: 'report',
          content: this.formatReport(parsedArgs),
          data: parsedArgs,
          render: this.renderReport(parsedArgs)
        };

      default:
        throw new Error(`Unknown function: ${name}`);
    }
  }

  private renderTextContent(content: string) {
    return React.createElement(React.Fragment, null,
      content.split('\n').map((line, i) => 
        React.createElement(React.Fragment, { key: i },
          line,
          i !== content.split('\n').length - 1 && React.createElement('br')
        )
      )
    );
  }

  private formatGoal(data: any): string {
    return `Goal: ${data.title}\nDeadline: ${data.deadline}\nPriority: ${data.priority}\nBaseline: ${data.baseline}\nTarget: ${data.target}`;
  }

  private renderGoal(data: any) {
    return React.createElement('div', { className: 'bg-gray-50 p-4 rounded-lg' },
      React.createElement('h3', { className: 'font-medium' }, data.title),
      React.createElement('div', { className: 'mt-2 space-y-2' },
        React.createElement('p', null, `Deadline: ${data.deadline}`),
        React.createElement('p', null, `Priority: ${data.priority}`),
        React.createElement('p', null, `Baseline: ${data.baseline}`),
        React.createElement('p', null, `Target: ${data.target}`)
      )
    );
  }

  private formatReport(data: any): string {
    return `Report: ${data.title}\n${data.data.map((item: any) => 
      `${item.date}: ${item.callCount} calls, ${item.averageDuration}min avg, ${item.resolutionRate * 100}% resolution`
    ).join('\n')}`;
  }

  private renderReport(data: any) {
    return React.createElement('div', { className: 'bg-gray-50 p-4 rounded-lg' },
      React.createElement('h3', { className: 'font-medium' }, data.title),
      React.createElement('div', { className: 'mt-2 space-y-2' },
        data.data.map((item: any, index: number) =>
          React.createElement('div', { key: index, className: 'text-sm' },
            React.createElement('p', null, `Date: ${item.date}`),
            React.createElement('p', null, `Calls: ${item.callCount}`),
            React.createElement('p', null, `Avg Duration: ${item.averageDuration}min`),
            React.createElement('p', null, `Resolution Rate: ${item.resolutionRate * 100}%`)
          )
        )
      )
    );
  }
}

// Create and export a singleton instance
export const responseHandlerService = new ResponseHandlerService(); 