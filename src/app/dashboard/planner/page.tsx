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
      content: "I'm here to help with your strategic planning. We can work on setting goals, finding insights, planning actions, or tracking progress. Where would you like to start?" 
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
      
      // Extract the assistant's message from the response
      const assistantMessage: MessageType = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      // Add assistant's response to chat
      setChat(prev => [...prev, assistantMessage]);

      // Save chat history
      saveChat([...updatedChat, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
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
      content: "I'm here to help with your strategic planning. We can work on setting goals, finding insights, planning actions, or tracking progress. Where would you like to start?"
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