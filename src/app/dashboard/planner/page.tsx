'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MetricCards } from './components/MetricCards';
import { PlanningHierarchy } from './components/PlanningHierarchy';
import { ChatInterface } from './components/ChatInterface';
import { initialHierarchy } from './data/initialData';
import { ChatMessage, ChatHistory, Tool } from './types';
import { getTools } from './utils/getTools';
import { messagePreparationService } from './services/messagePreparation';
import { responseHandlerService } from './services/responseHandlers';
import { ChatMessage as MessageType } from './types/messages';

const PlannerDashboard = () => {
  const [hierarchy, setHierarchy] = useState(initialHierarchy);
  const [activeView, setActiveView] = useState('chat');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<MessageType[]>([
    { 
      role: 'assistant', 
      content: "I'm here to help with your strategic planning. I can:\n\n" +
        "- Create charts and visualizations of your data\n" +
        "- Generate detailed reports and analysis\n" +
        "- Set up goals with deadlines and metrics\n" +
        "- Track progress and provide insights\n\n" +
        "What would you like to work on?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadTools = async () => {
      try {
        const response = await fetch('/api/tools');
        const availableTools = await response.json();
        
        // Dynamically import tool components
        const toolComponents = await Promise.all(
          availableTools.map(async (tool) => {
            try {
              const component = await dynamic(() => import(`../tools/${tool.type}/page`));
              return [tool.path, component];
            } catch (error) {
              console.error(`Error loading tool ${tool.type}:`, error);
              return [tool.path, null];
            }
          })
        );

        // Update hierarchy with available tools
        setHierarchy(prev => ({
          ...prev,
          tools: availableTools
        }));

        // Create tools object for dynamic rendering
        const toolsObj = Object.fromEntries(toolComponents);
        setTools(toolsObj);
      } catch (error) {
        console.error('Error loading tools:', error);
      }
    };

    loadTools();
  }, []);

  const addGoalToHierarchy = (goalItem: HierarchyItem) => {
    console.log('Adding goal to hierarchy:', goalItem);
    setHierarchy(prev => {
      // Check if the goal already exists to prevent duplicates
      const goalsSection = prev.sections.find(s => s.id === 'goals');
      if (goalsSection && !goalsSection.items.some(item => item.id === goalItem.id)) {
        return {
          ...prev,
          sections: prev.sections.map(section => 
            section.id === 'goals'
              ? { ...section, items: [goalItem, ...section.items] }
              : section
          )
        };
      }
      return prev;
    });
  };

  const sendMessage = async (newMessage: string) => {
    try {
      setIsLoading(true);
      
      // Prepare the message and get transformations
      const prepared = messagePreparationService.prepareMessage(newMessage);
      
      // Set the transformations in the response handler
      responseHandlerService.setAppliedTransformations(prepared.appliedTransformations);
      
      // Add user message to chat with original content
      const userMessage: MessageType = { role: 'user', content: newMessage };
      const updatedChat = [...chat, userMessage];
      setChat(updatedChat);
      setMessage('');

      // Prepare the LLM request using the message preparation service
      const llmRequest = messagePreparationService.prepareLLMRequest(chat, newMessage);

      // Enhanced request logging
      console.log('🚀 LLM Request:', {
        messages: llmRequest.messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        tools: llmRequest.tools.map(t => ({
          name: t.function.name,
          description: t.function.description,
          parameters: t.function.parameters
        }))
      });

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(llmRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to get response from AI: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      // Enhanced response logging
      console.log('📥 LLM Response:', {
        content: data.choices[0].message.content,
        tool_calls: data.choices[0].message.tool_calls ? data.choices[0].message.tool_calls.map(t => ({
          name: t.function.name,
          arguments: JSON.parse(t.function.arguments)
        })) : 'No tool calls'
      });
      
      // Extract and handle the assistant's message from the response
      const assistantMessage = data.choices[0].message;
      let messageContent = assistantMessage.content || '';
      let renderedContent = null;

      // Handle tool calls if present
      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        console.log('🛠️ Processing tool calls:', assistantMessage.tool_calls);
        const handlerResult = await responseHandlerService.handleResponse(assistantMessage);
        messageContent = handlerResult.content;
        renderedContent = handlerResult.render;

        // If it's a goal creation, add it to the hierarchy
        if (handlerResult.type === 'goal' && handlerResult.data) {
          console.log('🎯 Creating new goal:', handlerResult.data);
          const hierarchyItem = {
            id: Date.now(),
            title: handlerResult.data.title,
            expanded: false,
            details: handlerResult.data.description,
            subtasks: [
              { 
                id: Date.now() + 1, 
                title: 'Initial Setup', 
                status: 'completed' 
              },
              { 
                id: Date.now() + 2, 
                title: 'Progress Tracking', 
                status: 'in-progress' 
              }
            ]
          };
          addGoalToHierarchy(hierarchyItem);
        }
      }

      // Add assistant's response to chat
      setChat(prev => [...prev, {
        role: 'assistant',
        content: messageContent,
        render: renderedContent
      }]);

      // Save chat history
      saveChat([...updatedChat, {
        role: 'assistant',
        content: messageContent,
        render: renderedContent
      }]);
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setChat(prev => [...prev, {
        role: 'system',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setHierarchy(prev => ({
      ...prev,
      chatHistory: []
    }));
    setChat([{
      role: 'assistant',
      content: "I'm here to help with your strategic planning. I can:\n\n" +
        "- Create charts and visualizations of your data\n" +
        "- Generate detailed reports and analysis\n" +
        "- Set up goals with deadlines and metrics\n" +
        "- Track progress and provide insights\n\n" +
        "What would you like to work on?"
    }]);
  };

  const saveChat = (messages: MessageType[]) => {
    if (messages.length < 2) return; // Don't save empty chats
    
    const userMessage = messages.find(m => m.role === 'user');
    if (!userMessage) return;

    const newChat: ChatHistory = {
      id: Date.now(),
      title: userMessage.content.slice(0, 50) + (userMessage.content.length > 50 ? '...' : ''),
      timestamp: new Date().toLocaleString(),
      messages
    };

    setHierarchy(prev => ({
      ...prev,
      chatHistory: [newChat, ...prev.chatHistory]
    }));
  };

  const handleToolClick = (tool) => {
    setActiveView(tool.path || 'chat');
  };

  const renderRightPane = () => {
    // If it's a tool and we have the component loaded
    if (activeView.startsWith('/dashboard/tools/') && tools[activeView]) {
      const ToolComponent = tools[activeView];
      return (
        <div className="h-full overflow-y-auto">
          <ToolComponent />
        </div>
      );
    }

    // Default to chat interface
    return (
      <ChatInterface
        chat={chat}
        setChat={setChat}
        message={message}
        setMessage={setMessage}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        onNewChat={handleNewChat}
      />
    );
  };

  return (
    <div className="min-h-screen h-screen bg-[var(--background)] flex flex-col overflow-hidden">
      {/* Top Dashboard */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)] w-full">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <MetricCards />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full px-4 md:px-6 py-4 md:py-6 min-h-0 gap-6 overflow-hidden">
        {/* Left Panel - Hierarchy */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 overflow-hidden">
          <PlanningHierarchy 
            hierarchy={hierarchy} 
            setHierarchy={setHierarchy}
            onToolClick={handleToolClick}
            activeView={activeView}
          />
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 w-full min-w-0 overflow-y-auto">
          <div className="h-full">
            {renderRightPane()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;