'use client';
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Send, Plus, Target, BadgeCheck, Clock, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themeClasses } from '@/lib/theme';

const initialHierarchy = {
  sections: [
    {
      id: 'goals',
      title: 'Set Goals',
      expanded: true,
      items: [
        {
          id: 1,
          title: 'Increase Market Share by 25%',
          expanded: true,
          details: 'Target emerging markets in Asia and South America'
        }
      ]
    },
    {
      id: 'insights',
      title: 'Find Insights',
      expanded: true,
      items: [
        {
          id: 1,
          title: 'Market Analysis Complete',
          expanded: true,
          details: 'Key findings suggest strong demand in Southeast Asia'
        }
      ]
    },
    {
      id: 'actions',
      title: 'Take Action',
      expanded: true,
      items: [
        {
          id: 1,
          title: 'Launch Marketing Campaign',
          status: 'in-progress',
          expanded: true,
          subtasks: [
            {
              id: 1,
              title: 'Social Media Strategy',
              status: 'completed'
            }
          ]
        }
      ]
    },
    {
      id: 'progress',
      title: 'Track Progress',
      expanded: true,
      items: [
        {
          id: 1,
          title: 'Q1 Results',
          expanded: true,
          metrics: [
            {
              id: 1,
              title: 'Market Share Growth',
              value: '8.5%',
              status: 'on-track'
            }
          ]
        }
      ]
    }
  ]
};

const Dashboard = () => {
  const [hierarchy, setHierarchy] = useState(initialHierarchy);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'system', content: "Let's work on your strategic planning. Where would you like to start?" }
  ]);

  const toggleExpand = (sectionId, itemId) => {
    setHierarchy(prev => {
      const newHierarchy = { ...prev };
      const section = newHierarchy.sections.find(s => s.id === sectionId);
      if (section) {
        const item = section.items.find(i => i.id === itemId);
        if (item) {
          item.expanded = !item.expanded;
        }
      }
      return newHierarchy;
    });
  };

  const renderMetrics = (metrics) => (
    <div className="ml-6">
      {metrics.map(metric => (
        <div key={metric.id} className="flex items-center gap-2 py-1">
          <span className={`text-sm ${themeClasses.textSecondary}`}>{metric.title}:</span>
          <span className={`text-sm font-medium ${
            metric.status === 'on-track' ? themeClasses.success :
            metric.status === 'at-risk' ? 'text-yellow-600' :
            metric.status === 'behind' ? themeClasses.error : ''
          }`}>
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );

  const renderSubtasks = (subtasks) => (
    <div className="ml-6">
      {subtasks.map(task => (
        <div key={task.id} className="flex items-center gap-2 py-1">
          <div className={`w-2 h-2 rounded-full ${
            task.status === 'completed' ? 'bg-[var(--success)]' :
            task.status === 'in-progress' ? 'bg-[var(--info)]' :
            'bg-[var(--card-border)]'
          }`} />
          <span className={`text-sm ${themeClasses.textSecondary}`}>{task.title}</span>
        </div>
      ))}
    </div>
  );

  const renderSection = (section) => (
    <div key={section.id} className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className={`font-semibold text-lg ${themeClasses.textPrimary}`}>{section.title}</h3>
        <button 
          className="p-1 hover:bg-[var(--card-background)] rounded"
          onClick={() => {/* Add new item logic */}}
        >
          <Plus size={16} />
        </button>
      </div>
      {section.items.map(item => (
        <div key={item.id} className="ml-4">
          <div className="flex items-center gap-2 py-2">
            {(item.subtasks?.length > 0 || item.metrics?.length > 0) && (
              <button 
                onClick={() => toggleExpand(section.id, item.id)}
                className="p-1 hover:bg-[var(--card-background)] rounded"
              >
                {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <span className={`font-medium ${themeClasses.textPrimary}`}>{item.title}</span>
            {item.status && (
              <span className={`text-sm px-2 py-1 rounded ${
                item.status === 'completed' ? 'bg-green-100 text-green-800' :
                item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-[var(--card-background)]'
              }`}>
                {item.status}
              </span>
            )}
          </div>
          {item.expanded && (
            <>
              {item.details && (
                <div className={`ml-6 text-sm ${themeClasses.textSecondary}`}>
                  {item.details}
                </div>
              )}
              {item.subtasks && renderSubtasks(item.subtasks)}
              {item.metrics && renderMetrics(item.metrics)}
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Dashboard */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={themeClasses.textSecondary}>Goals Set</p>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>4</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className={`text-sm ${themeClasses.textSecondary}`}>On Track</p>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>2</p>
                  </div>
                  <p className={themeClasses.success}>50%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={themeClasses.textSecondary}>Key Insights</p>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>6</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BadgeCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className={`text-sm ${themeClasses.textSecondary}`}>New This Week</p>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>3</p>
                  </div>
                  <p className={themeClasses.success}>↑ 2</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={themeClasses.textSecondary}>Actions</p>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>12/20</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Complete</p>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>60%</p>
                  </div>
                  <p className={themeClasses.success}>↑ 5%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className={themeClasses.textSecondary}>Progress</p>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>75%</p>
                  </div>
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Overall</p>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>Complete</p>
                  </div>
                  <p className={themeClasses.success}>↑ 8%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-6 flex min-h-0 flex-1">
        {/* Left Panel - Hierarchy */}
        <div className="w-96 border-r border-[var(--card-border)] pr-6">
          {hierarchy.sections.map(section => renderSection(section))}
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 flex flex-col pl-6">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto">
            {chat.map((msg, i) => (
              <div 
                key={i} 
                className={`mb-4 ${
                  msg.role === 'system' ? '' :
                  msg.role === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'system' ? 'bg-[var(--card-background)] border border-[var(--card-border)]' :
                  msg.role === 'user' ? 'bg-blue-500 text-white' :
                  'bg-[var(--background)] border border-[var(--card-border)]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="mt-4 border-t border-[var(--card-border)] pt-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) {
                  setChat(prev => [...prev, { role: 'user', content: message }]);
                  setMessage('');
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;