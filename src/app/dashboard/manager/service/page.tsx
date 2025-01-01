'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Star, Clock, MessageSquare, BadgeCheck, AlertCircle } from 'lucide-react';

export default function ServiceManagerDashboard() {
  // Sample data for the performance chart
  const performanceData = [
    { hour: '9AM', satisfaction: 4.8, responseTime: 45, resolution: 92 },
    { hour: '10AM', satisfaction: 4.6, responseTime: 52, resolution: 88 },
    { hour: '11AM', satisfaction: 4.9, responseTime: 38, resolution: 95 },
    { hour: '12PM', satisfaction: 4.7, responseTime: 48, resolution: 90 },
    { hour: '1PM', satisfaction: 4.8, responseTime: 42, resolution: 93 },
  ];

  // Case distribution data
  const caseTypes = [
    { name: 'Account', value: 35, color: '#2563eb' },
    { name: 'Billing', value: 25, color: '#16a34a' },
    { name: 'Product', value: 20, color: '#9333ea' },
    { name: 'General', value: 20, color: '#ea580c' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Team Dashboard</h1>
              <p className="text-gray-600">Customer Service Performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-900 font-medium">18/20 Service Agents Active</span>
              </div>
              <div className="bg-green-50 p-2 rounded-lg flex items-center">
                <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-900 font-medium">Queue Status: Normal</span>
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
                  <p className="text-gray-600 text-sm">CSAT Score</p>
                  <p className="text-2xl font-bold text-gray-900">4.8/5.0</p>
                  <p className="text-green-600 text-sm font-medium">↑ 0.2 vs target</p>
                </div>
                <Star className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">First Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">2:45</p>
                  <p className="text-red-600 text-sm font-medium">↑ 15s vs target</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-green-600 text-sm font-medium">↑ 3% vs target</p>
                </div>
                <BadgeCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Open Cases</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                  <p className="text-yellow-600 text-sm font-medium">↑ 5 vs average</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Service Team */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Active Service Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Emma Davis', status: 'On Call', csat: '4.9', cases: '8/12' },
                    { name: 'John Smith', status: 'Available', csat: '4.7', cases: '6/12' },
                    { name: 'Lisa Wong', status: 'In Chat', csat: '4.8', cases: '7/12' },
                    { name: 'Mark Brown', status: 'On Break', csat: '4.6', cases: '5/12' },
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{agent.name}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            agent.status === 'Available' ? 'bg-green-500' :
                            agent.status === 'On Break' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          {agent.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium text-gray-900">{agent.csat}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Cases: {agent.cases}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Case Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={caseTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {caseTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="#2563eb" 
                        name="CSAT"
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="resolution" 
                        stroke="#16a34a" 
                        name="Resolution Rate (%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Avg Handle Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">12:45</p>
                    <p className="text-sm text-green-600 font-medium">↓ 30s vs target</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Queue Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">1:30</p>
                    <p className="text-sm text-green-600 font-medium">↓ 15s vs target</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <BadgeCheck className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-gray-600">First Contact Resolution</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">85%</p>
                    <p className="text-sm text-green-600 font-medium">↑ 2% vs target</p>
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