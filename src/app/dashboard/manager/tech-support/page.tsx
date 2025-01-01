'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Wrench, Clock, AlertCircle, CheckCircle, Network } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Tech Support Dashboard</h1>
              <p className={themeClasses.textSecondary}>Technical Support Performance</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className={themeClasses.textPrimary}>15/18 Support Engineers Active</span>
              </div>
              <div className="bg-green-50 p-2 rounded-lg flex items-center">
                <Network className="h-5 w-5 text-green-600 mr-2" />
                <span className={themeClasses.textPrimary}>All Systems Operational</span>
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
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Resolution Rate</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>92%</p>
                  <p className={themeClasses.success}>↑ 3% vs target</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Avg Resolution Time</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>42m</p>
                  <p className={themeClasses.error}>↑ 5m vs target</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Open Tickets</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>127</p>
                  <p className={themeClasses.error}>↑ 12 vs average</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>First Contact Resolution</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>78%</p>
                  <p className={themeClasses.success}>↑ 5% vs last week</p>
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
                <CardTitle className={themeClasses.textPrimary}>Active Support Engineers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Alex Chen', status: 'On Call', resolved: '12/15', sla: '95%' },
                    { name: 'Sarah Kim', status: 'Available', resolved: '10/15', sla: '92%' },
                    { name: 'James Wilson', status: 'Remote Session', resolved: '11/15', sla: '94%' },
                    { name: 'Maria Garcia', status: 'On Break', resolved: '8/15', sla: '88%' },
                  ].map((engineer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg hover:bg-gray-50">
                      <div>
                        <p className={`font-medium ${themeClasses.textPrimary}`}>{engineer.name}</p>
                        <div className={`flex items-center text-sm ${themeClasses.textSecondary}`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            engineer.status === 'Available' ? 'bg-green-500' :
                            engineer.status === 'On Break' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          {engineer.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${themeClasses.textPrimary}`}>Resolved: {engineer.resolved}</p>
                        <p className={themeClasses.success}>SLA: {engineer.sla}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Critical Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className={`font-medium ${themeClasses.textPrimary}`}>Database Performance</p>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>3 customers affected</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className={`font-medium ${themeClasses.textPrimary}`}>API Response Time</p>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>Above threshold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Support Performance Trends</CardTitle>
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
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      <span className={themeClasses.textSecondary}>Ticket Volume</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>245</p>
                    <p className={themeClasses.error}>↑ 15 vs avg</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className={themeClasses.textSecondary}>SLA Compliance</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>94%</p>
                    <p className={themeClasses.success}>↑ 2% vs target</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--card-background)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span className={themeClasses.textSecondary}>Escalation Rate</span>
                    </div>
                    <p className={`text-2xl font-bold ${themeClasses.textPrimary} mt-2`}>8%</p>
                    <p className={themeClasses.success}>↓ 2% vs target</p>
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