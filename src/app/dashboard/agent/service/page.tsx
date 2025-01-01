'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageSquare, Clock, User, Star, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function ServiceAgentPage() {
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
              <h2 className="font-semibold text-lg">Emma Davis</h2>
              <p className="text-sm text-gray-500">Customer Service • ID: CS-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-blue-50 p-2 rounded-lg flex items-center">
              <Star className="h-5 w-5 text-blue-500 mr-2" />
              <span>CSAT: 4.8/5.0</span>
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
              <option value="busy">🔴 Busy</option>
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
                <TabsTrigger value="cases" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Cases
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Case - Account Support</CardTitle>
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
                            Close Case
                          </button>
                          <button className="bg-gray-200 px-4 py-2 rounded-lg">
                            Escalate
                          </button>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Knowledge Base
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Create Ticket
                        </button>
                      </div>

                      {/* Case Notes */}
                      <div>
                        <h3 className="font-medium mb-2">Case Notes</h3>
                        <textarea 
                          className="w-full h-32 p-3 border rounded-lg"
                          placeholder="Enter case notes..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Customer Name</label>
                    <p className="font-medium">Jane Smith</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Account Type</label>
                    <p className="font-medium">Premium</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-medium">Active</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Recent Cases</label>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm p-2 bg-gray-50 rounded">
                        <p className="font-medium">Billing Question</p>
                        <p className="text-gray-500">Resolved - 2 days ago</p>
                      </div>
                      <div className="text-sm p-2 bg-gray-50 rounded">
                        <p className="font-medium">Account Access</p>
                        <p className="text-gray-500">Resolved - 5 days ago</p>
                      </div>
                    </div>
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