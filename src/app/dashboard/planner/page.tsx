'use client';
import React, { useState } from 'react';
import { MetricCards } from './components/MetricCards';
import { PlanningHierarchy } from './components/PlanningHierarchy';
import { ChatInterface } from './components/ChatInterface';
import { initialHierarchy } from './data/initialData';

const PlannerDashboard = () => {
  const [hierarchy, setHierarchy] = useState(initialHierarchy);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'system', content: "Let's work on your strategic planning. Where would you like to start?" }
  ]);

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
          />
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;