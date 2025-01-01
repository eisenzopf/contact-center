'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Wrench, Clock, AlertCircle, CheckCircle, Network } from 'lucide-react';

export default function TechSupportManagerDashboard() {
  // Sample performance data
  const performanceData = [
    { hour: '9AM', resolutionTime: 35, firstContact: 82, tickets: 45 },
    { hour: '10AM', resolutionTime: 42, firstContact: 78, tickets: 52 },
    { hour: '11AM', resolutionTime: 38, firstContact: 85, tickets: 48 },
    { hour: '12PM', resolutionTime: 45, firstContact: 75, tickets: 38 },
    { hour: '1PM', resolutionTime: 40, firstContact: 80, tickets: 42 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tech Support Dashboard</h1>
              <p className="text-gray-600">Technical Support Team Performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-900 font-medium">15/18 Support Engineers Active</span>
              </div>
              <div className="bg-green-50 p-2 rounded-lg flex items-center">
                <Network className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-900 font-medium">All Systems Operational</span>
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
                  <p className="text-gray-600 text-sm">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-green-600 text-sm font-medium">↑ 3% vs target</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Avg Resolution Time</p>
                  <p className="text-2xl font-bold text-gray-900">42m</p>
                  <p className="text-red-600 text-sm font-medium">↑ 5m vs target</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">Open Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                  <p className="text-yellow-600 text-sm font-medium">↑ 12 vs average</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">First Contact Resolution</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-green-600 text-sm font-medium">↑ 5% vs last week</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Team Performance */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Active Support Engineers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Chen', status: 'On Call', resolved: '12/15', sla: '95%' },
                    { name: 'Sarah Kim', status: 'Available', resolved: '10/15', sla: '92%' },
                    { name: 'James Wilson', status: 'Remote Session', resolved: '11/15', sla: '94%' },
                    { name: 'Maria Garcia', status: 'On Break', resolved: '8/15', sla: '88%' },
                  ].map((engineer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{engineer.name}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            engineer.status === 'Available' ? 'bg-green-500' :
                            engineer.status === 'On Break' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          {engineer.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Resolved: {engineer.resolved}</p>
                        <p className="text-sm text-green-600">SLA: {engineer.sla}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Critical Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="font-medium text-gray-900">Database Performance</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">3 customers affected</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="font-medium text-gray-900">API Response Time</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Above threshold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Support Performance Trends</CardTitle>
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
                        dataKey="resolutionTime" 
                        stroke="#2563eb" 
                        name="Avg Resolution Time (min)"
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="firstContact" 
                        stroke="#16a34a" 
                        name="First Contact Resolution (%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Ticket Volume</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">245</p>
                    <p className="text-sm text-yellow-600 font-medium">↑ 15 vs avg</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">SLA Compliance</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">94%</p>
                    <p className="text-sm text-green-600 font-medium">↑ 2% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Escalation Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">8%</p>
                    <p className="text-sm text-green-600 font-medium">↓ 2% vs target</p>
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