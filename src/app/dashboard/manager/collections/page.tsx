'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, DollarSign, Calendar, AlertCircle, TrendingUp, FileText } from 'lucide-react';

export default function CollectionsManagerDashboard() {
  // Sample performance data
  const performanceData = [
    { hour: '9AM', collected: 45000, promises: 15, contacts: 85 },
    { hour: '10AM', collected: 52000, promises: 18, contacts: 92 },
    { hour: '11AM', collected: 48000, promises: 16, contacts: 88 },
    { hour: '12PM', collected: 38000, promises: 12, contacts: 75 },
    { hour: '1PM', collected: 42000, promises: 14, contacts: 82 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Collections Dashboard</h1>
              <p className="text-gray-600">Collections Team Performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-900 font-medium">14/15 Agents Active</span>
              </div>
              <div className="bg-green-50 p-2 rounded-lg flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-900 font-medium">MTD: 85% of Target</span>
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
                  <p className="text-gray-600 text-sm">Amount Collected</p>
                  <p className="text-2xl font-bold text-gray-900">$225,000</p>
                  <p className="text-green-600 text-sm font-medium">↑ 12% vs target</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Promise to Pay</p>
                  <p className="text-2xl font-bold text-gray-900">75</p>
                  <p className="text-green-600 text-sm font-medium">↑ 5 vs yesterday</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Contact Rate</p>
                  <p className="text-2xl font-bold text-gray-900">42%</p>
                  <p className="text-red-600 text-sm font-medium">↓ 3% vs target</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Compliance Score</p>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-green-600 text-sm font-medium">↑ 1% vs target</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Team Performance */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Active Collections Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Robert Chen', status: 'On Call', collected: '$28,500', rate: '115%' },
                    { name: 'Maria Garcia', status: 'Available', collected: '$22,890', rate: '96%' },
                    { name: 'James Wilson', status: 'In Meeting', collected: '$21,200', rate: '88%' },
                    { name: 'Susan Kim', status: 'On Break', collected: '$19,500', rate: '82%' },
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
                        <p className="font-medium text-gray-900">{agent.collected}</p>
                        <p className={`text-sm font-medium ${
                          parseInt(agent.rate) >= 100 ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {agent.rate} of Goal
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="font-medium text-gray-900">Call Script Violation</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2 instances detected</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="font-medium text-gray-900">Payment Documentation</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">3 records need review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Collections Performance</CardTitle>
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
                        dataKey="collected" 
                        stroke="#2563eb" 
                        name="Amount Collected ($)"
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="contacts" 
                        stroke="#16a34a" 
                        name="Contact Rate (%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Avg Recovery</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">$1,850</p>
                    <p className="text-sm text-green-600 font-medium">↑ 8% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Promise Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">32%</p>
                    <p className="text-sm text-green-600 font-medium">↑ 5% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Compliance Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">98%</p>
                    <p className="text-sm text-green-600 font-medium">↑ 1% vs target</p>
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