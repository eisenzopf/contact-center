'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Clock, Heart } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

interface MetricData {
  day: string;
  empathy: number;
  handleTime: number;
  successRate: number;
}

const mockData: MetricData[] = [
  { day: 'Monday', empathy: 4.2, handleTime: 325, successRate: 88 },
  { day: 'Tuesday', empathy: 4.5, handleTime: 280, successRate: 92 },
  { day: 'Wednesday', empathy: 4.3, handleTime: 295, successRate: 85 },
  { day: 'Thursday', empathy: 4.7, handleTime: 270, successRate: 94 },
  { day: 'Friday', empathy: 4.4, handleTime: 285, successRate: 90 }
];

const QADashboard: React.FC = () => {
  const calculateAverages = () => {
    const avgEmpathy = mockData.reduce((acc, curr) => acc + curr.empathy, 0) / mockData.length;
    const avgHandleTime = mockData.reduce((acc, curr) => acc + curr.handleTime, 0) / mockData.length;
    const avgSuccessRate = mockData.reduce((acc, curr) => acc + curr.successRate, 0) / mockData.length;
    return { avgEmpathy, avgHandleTime, avgSuccessRate };
  };

  const averages = calculateAverages();

  const getScoreColor = (score: number, metric: 'empathy' | 'handleTime' | 'successRate') => {
    if (metric === 'empathy') {
      return score >= 4.5 ? 'text-[var(--success)]' : score >= 4.0 ? 'text-[var(--warning)]' : 'text-[var(--error)]';
    } else if (metric === 'handleTime') {
      return score <= 280 ? 'text-[var(--success)]' : score <= 320 ? 'text-[var(--warning)]' : 'text-[var(--error)]';
    } else {
      return score >= 90 ? 'text-[var(--success)]' : score >= 85 ? 'text-[var(--warning)]' : 'text-[var(--error)]';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto bg-[var(--background)]">
      <div className={`text-3xl font-bold mb-8 ${themeClasses.textPrimary}`}>Weekly QA Report - Agent Performance</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${themeClasses.textPrimary}`}>Empathy Score</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(averages.avgEmpathy, 'empathy')}`}>
              {averages.avgEmpathy.toFixed(1)}/5.0
            </div>
            <p className={`text-xs ${themeClasses.textSecondary}`}>
              Weekly Average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${themeClasses.textPrimary}`}>Avg Handle Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(averages.avgHandleTime, 'handleTime')}`}>
              {averages.avgHandleTime.toFixed(0)}s
            </div>
            <p className={`text-xs ${themeClasses.textSecondary}`}>
              Weekly Average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${themeClasses.textPrimary}`}>Success Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(averages.avgSuccessRate, 'successRate')}`}>
              {averages.avgSuccessRate.toFixed(1)}%
            </div>
            <p className={`text-xs ${themeClasses.textSecondary}`}>
              Weekly Average
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[var(--card-background)] border-[var(--card-border)]">
        <CardHeader>
          <CardTitle className={themeClasses.textPrimary}>Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="empathy" 
                  stroke="var(--error)" 
                  name="Empathy Score"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="handleTime" 
                  stroke="var(--info)" 
                  name="Handle Time (s)"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="successRate" 
                  stroke="var(--success)" 
                  name="Success Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--card-background)] border-[var(--card-border)]">
        <CardHeader>
          <CardTitle className={themeClasses.textPrimary}>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>Empathy Score Analysis</h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                The agent maintains a consistent level of empathy throughout the week, 
                with notable improvement on Thursday. Consider sharing best practices 
                from Thursday's interactions with the team.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>Handle Time Efficiency</h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Average handle time shows a positive trend with consistent improvement. 
                Tuesday and Thursday demonstrated optimal efficiency levels below the 
                target of 300 seconds.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>Success Rate Insights</h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Success rates remain strong with an exceptional performance on Thursday 
                at 94%. Wednesday showed a slight dip and may require additional support 
                or training for similar scenarios.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QADashboard;