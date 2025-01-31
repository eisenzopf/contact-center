'use client';
import React, { useState } from 'react';
import { MetricCards } from './components/MetricCards';
import { PlanningHierarchy } from './components/PlanningHierarchy';
import { ChatInterface } from './components/ChatInterface';
import { initialHierarchy } from './data/initialData';
import { ChatMessage } from './types';

const PlannerDashboard = () => {
  const [hierarchy, setHierarchy] = useState(initialHierarchy);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([
    { 
      role: 'system', 
      content: `You are an AI assistant helping with strategic planning. 
      Focus on providing actionable insights and clear next steps.
      You have access to a planning hierarchy with goals, insights, actions, and progress tracking.
      Help the user develop and refine their strategic plan.`
    },
    { 
      role: 'assistant', 
      content: "I'm here to help with your strategic planning. We can work on setting goals, finding insights, planning actions, or tracking progress. Where would you like to start?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (newMessage: string) => {
    try {
      setIsLoading(true);
      
      // Add user message to chat
      const userMessage: ChatMessage = { role: 'user', content: newMessage };
      const updatedChat = [...chat, userMessage];
      setChat(updatedChat);
      setMessage('');

      // Prepare the API request
      const response = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-r1-distill-qwen-14b', // Replace with your loaded model name
          messages: updatedChat,
          /*"messages": [
            { "role": "system", "content": "Always answer in rhymes. Today is Thursday" },
            { "role": "user", "content": "What day is it today?" }
          ],*/
          temperature: 0.7,
          max_tokens: -1,
          stream: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      // Extract the assistant's message from the response
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      // Add assistant's response to chat
      setChat(prev => [...prev, assistantMessage]);
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

  return (
    <div className="min-h-screen h-screen bg-[var(--background)] flex flex-col overflow-hidden">
      {/* Top Dashboard */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)] w-full">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <MetricCards />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-screen-xl mx-auto w-full px-4 md:px-6 py-4 md:py-6 min-h-0 gap-6 overflow-hidden">
        {/* Left Panel - Hierarchy */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 overflow-hidden">
          <PlanningHierarchy 
            hierarchy={hierarchy} 
            setHierarchy={setHierarchy} 
          />
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <ChatInterface
            chat={chat}
            setChat={setChat}
            message={message}
            setMessage={setMessage}
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;