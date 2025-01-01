'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Target, AlertCircle, TrendingUp } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

export default function SalesManagerDashboard() {
  // Sample data for the performance chart
  const performanceData = [
    { hour: '9AM', revenue: 12500, deals: 8, conversion: 28 },
    { hour: '10AM', revenue: 15800, deals: 12, conversion: 32 },
    { hour: '11AM', revenue: 14200, deals: 10, conversion: 30 },
    { hour: '12PM', revenue: 11000, deals: 7, conversion: 25 },
    { hour: '1PM', revenue: 13500, deals: 9, conversion: 29 },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Sales Team Dashboard</h1>
              <p className={themeClasses.textSecondary}>Inside Sales Performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className={themeClasses.textPrimary}>12/15 Sales Agents Active</span>
              </div>
              <div className="bg-green-50 p-2 rounded-lg flex items-center">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <span className={themeClasses.textPrimary}>Daily Target: 82% Achieved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto p-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Daily Revenue</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>$67,890</p>
                  <p className={themeClasses.success}>↑ 12% vs target</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Conversion Rate</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>32%</p>
                  <p className={themeClasses.success}>↑ 5% vs last week</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Avg Deal Size</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>$2,450</p>
                  <p className={themeClasses.error}>↓ 3% vs target</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Pipeline Value</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>$125K</p>
                  <p className={themeClasses.success}>↑ 8% vs last week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Team Performance */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Active Sales Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Mike Johnson', status: 'On Call', revenue: '$3,450', quota: '115%' },
                    { name: 'Sarah Wilson', status: 'Available', revenue: '$2,890', quota: '96%' },
                    { name: 'Chris Lee', status: 'In Meeting', revenue: '$2,100', quota: '88%' },
                    { name: 'Emma Davis', status: 'On Break', revenue: '$1,950', quota: '82%' },
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg hover:bg-gray-50">
                      <div>
                        <p className={`font-medium ${themeClasses.textPrimary}`}>{agent.name}</p>
                        <div className={`flex items-center text-sm ${themeClasses.textSecondary}`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            agent.status === 'Available' ? 'bg-green-500' :
                            agent.status === 'On Break' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          {agent.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${themeClasses.textPrimary}`}>{agent.revenue}</p>
                        <p className={parseInt(agent.quota) >= 100 ? themeClasses.success : themeClasses.error}>
                          {agent.quota} of Quota
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Performance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className={`font-medium ${themeClasses.textPrimary}`}>Conversion Rate Drop</p>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>Team B below target by 5%</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <p className={`font-medium ${themeClasses.textPrimary}`}>Top Performer</p>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>Mike J. exceeded daily target</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Today's Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} aria-label="Service Performance Trends Chart">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#2563eb" 
                        name="Revenue ($)"
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="conversion" 
                        stroke="#16a34a" 
                        name="Conversion Rate (%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className={themeClasses.textSecondary}>Avg Revenue/Hour</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>$13.4K</p>
                    <p className={themeClasses.success}>↑ 8% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className={themeClasses.textSecondary}>Conversion/Hour</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>28.8%</p>
                    <p className={themeClasses.error}>↓ 2% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className={themeClasses.textSecondary}>Deals Closed</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>45</p>
                    <p className={themeClasses.success}>↑ 5% vs target</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}