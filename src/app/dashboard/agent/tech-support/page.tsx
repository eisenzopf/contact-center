'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageSquare, Clock, User, Wrench, BookOpen, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TechSupportAgentPage() {
  const [status, setStatus] = useState('available');
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Alex Chen</h2>
              <p className="text-sm text-gray-500">Tech Support • ID: TS-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-purple-50 p-2 rounded-lg flex items-center">
              <Wrench className="h-5 w-5 text-purple-500 mr-2" />
              <span>Resolution Rate: 92%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm">4:23:15</span>
            </div>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-full px-4 py-1.5 text-sm bg-white"
            >
              <option value="available">🟢 Available</option>
              <option value="busy">🔴 On Call</option>
              <option value="break">⚫ Break</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Tabs defaultValue="current" className="space-y-4">
              <TabsList>
                <TabsTrigger value="current" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="tickets" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tickets
                </TabsTrigger>
                <TabsTrigger value="knowledge" className="flex items-center">
                  <Wrench className="h-4 w-4 mr-2" />
                  Knowledge Base
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Technical Support Case</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Timer and Controls */}
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-lg font-semibold">05:23</p>
                          <p className="text-sm text-gray-500">Case Duration</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            End Support
                          </button>
                          <button className="bg-gray-200 px-4 py-2 rounded-lg">
                            Screen Share
                          </button>
                          <button className="bg-gray-200 px-4 py-2 rounded-lg">
                            Escalate
                          </button>
                        </div>
                      </div>

                      {/* Issue Details */}
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">Issue Details</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Category:</span>
                              <span>Software Installation</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Priority:</span>
                              <span className="text-red-500">High</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Product:</span>
                              <span>Enterprise Suite v3.2</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Diagnostic Tools
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          System Logs
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Remote Access
                        </button>
                      </div>

                      {/* Support Notes */}
                      <div>
                        <h3 className="font-medium mb-2">Technical Notes</h3>
                        <textarea 
                          className="w-full h-32 p-3 border rounded-lg"
                          placeholder="Enter technical details and troubleshooting steps..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Customer Name</label>
                    <p className="font-medium">Michael Brown</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Product Version</label>
                    <p className="font-medium">Enterprise Suite v3.2</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Support Level</label>
                    <p className="font-medium">Premium</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">System Info</label>
                    <p className="text-sm mt-1">Windows Server 2022</p>
                    <p className="text-sm">16GB RAM, 4 CPU Cores</p>
                    <p className="text-sm">Last Update: 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Database Connection</p>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Resolved
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">3 days ago</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">API Integration</p>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Resolved
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">5 days ago</p>
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