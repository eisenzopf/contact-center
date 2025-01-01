'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, Target, TrendingUp, BadgeCheck, Clock, Phone } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

const ExecutiveDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  // Sample data for department performance
  const departmentData = [
    { month: 'Jan', sales: 92, service: 88, techSupport: 85, collections: 90 },
    { month: 'Feb', sales: 88, service: 90, techSupport: 87, collections: 86 },
    { month: 'Mar', sales: 95, service: 89, techSupport: 88, collections: 92 },
    { month: 'Apr', sales: 90, service: 91, techSupport: 86, collections: 89 },
    { month: 'May', sales: 93, service: 87, techSupport: 89, collections: 91 }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Executive Header */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Executive Overview</h1>
              <p className={themeClasses.textPrimary}>Contact Center Performance</p>
            </div>
            <div className="flex space-x-4">
              <select 
                className="border rounded-lg px-4 py-2 text-gray-800"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto p-6">
        {/* Department Performance Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className={themeClasses.textSecondary}>Sales</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>$1.2M</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Conversion Rate</p>
                  <p className={`font-medium ${themeClasses.textPrimary}`}>32%</p>
                </div>
                <p className={themeClasses.success}>↑ 8%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className={themeClasses.textSecondary}>Service</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>4.8/5.0</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <BadgeCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Resolution Rate</p>
                  <p className={`font-medium ${themeClasses.textPrimary}`}>92%</p>
                </div>
                <p className={themeClasses.success}>↑ 3%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className={themeClasses.textSecondary}>Tech Support</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>3:45</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className={`text-sm ${themeClasses.textSecondary}`}>First Response</p>
                  <p className={`font-medium ${themeClasses.textPrimary}`}>85%</p>
                </div>
                <p className={themeClasses.error}>↓ 2%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-700">Collections</p>
                  <p className="text-2xl font-bold text-gray-900">$850K</p>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">Recovery Rate</p>
                  <p className="font-medium text-gray-800">78%</p>
                </div>
                <p className="text-green-500 text-sm">↑ 5%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className={themeClasses.textPrimary}>Department Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#2563eb" name="Sales" />
                  <Line type="monotone" dataKey="service" stroke="#16a34a" name="Service" />
                  <Line type="monotone" dataKey="techSupport" stroke="#9333ea" name="Tech Support" />
                  <Line type="monotone" dataKey="collections" stroke="#ea580c" name="Collections" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={themeClasses.textPrimary}>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Sales', utilized: 85, capacity: 100 },
                  { name: 'Service', utilized: 92, capacity: 100 },
                  { name: 'Tech', utilized: 78, capacity: 100 },
                  { name: 'Collections', utilized: 88, capacity: 100 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke={`var(--text-primary)`} />
                  <YAxis stroke={`var(--text-primary)`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card-background)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-primary)'
                    }}
                    labelStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Legend 
                    wrapperStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Bar dataKey="utilized" fill="#3b82f6" name="Current Utilization" />
                  <Bar dataKey="capacity" fill="#94a3b8" name="Total Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className={themeClasses.textPrimary}>Customer Satisfaction by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: 'Sales', score: 4.8, change: '+0.2' },
                  { dept: 'Service', score: 4.6, change: '+0.1' },
                  { dept: 'Tech Support', score: 4.5, change: '-0.1' },
                  { dept: 'Collections', score: 4.3, change: '+0.3' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{item.dept}</p>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>CSAT Score</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${themeClasses.textPrimary}`}>{item.score}</p>
                      <p className={item.change.startsWith('+') ? themeClasses.success : themeClasses.error}>
                        {item.change} vs last period
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={themeClasses.textPrimary}>Operational Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: 'Sales', cost: '$45K', perContact: '$12.50' },
                  { dept: 'Service', cost: '$38K', perContact: '$8.20' },
                  { dept: 'Tech Support', cost: '$42K', perContact: '$15.30' },
                  { dept: 'Collections', cost: '$35K', perContact: '$10.80' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{item.dept}</p>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>Monthly Cost</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${themeClasses.textPrimary}`}>{item.cost}</p>
                      <p className={themeClasses.textSecondary}>{item.perContact} per contact</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={themeClasses.textPrimary}>Strategic Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <p className={`font-medium ${themeClasses.textPrimary}`}>Sales Opportunity</p>
                  <p className={themeClasses.textSecondary}>Cross-sell success rate increased by 15% in tech support calls</p>
                </div>
                <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                  <p className="font-medium">Risk Alert</p>
                  <p className="text-sm text-gray-700">
                    Service team approaching capacity during peak hours
                  </p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="font-medium">Efficiency Gain</p>
                  <p className="text-sm text-gray-700">
                    New chatbot reducing routine queries by 25%
                  </p>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                  <p className="font-medium">Training Need</p>
                  <p className="text-sm text-gray-700">
                    Collections team requires updated compliance training
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;