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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Dashboard */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto p-6">
          <MetricCards />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-6 flex min-h-0 flex-1">
        {/* Left Panel - Hierarchy */}
        <PlanningHierarchy 
          hierarchy={hierarchy} 
          setHierarchy={setHierarchy} 
        />

        {/* Right Panel - Chat */}
        <ChatInterface
          chat={chat}
          setChat={setChat}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default PlannerDashboard;