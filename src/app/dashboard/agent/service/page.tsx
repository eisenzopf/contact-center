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

              <TabsContent value="cases">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search and Filter */}
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="Search cases..."
                          className="flex-1 p-2 border rounded-lg"
                        />
                        <select className="border rounded-lg px-4 py-2 bg-white">
                          <option value="all">All Status</option>
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>

                      {/* Case List */}
                      <div className="space-y-3">
                        {[
                          {
                            id: 'CS-789',
                            title: 'Account Access Issue',
                            customer: 'Michael Brown',
                            status: 'Open',
                            priority: 'High',
                            updated: '2 hours ago'
                          },
                          {
                            id: 'CS-788',
                            title: 'Billing Dispute',
                            customer: 'Sarah Wilson',
                            status: 'Pending',
                            priority: 'Medium',
                            updated: '3 hours ago'
                          },
                          {
                            id: 'CS-787',
                            title: 'Product Information Request',
                            customer: 'James Lee',
                            status: 'Closed',
                            priority: 'Low',
                            updated: '5 hours ago'
                          }
                        ].map((caseItem, index) => (
                          <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-gray-500">{caseItem.id}</span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    caseItem.priority === 'High' ? 'bg-red-100 text-red-700' :
                                    caseItem.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {caseItem.priority}
                                  </span>
                                </div>
                                <p className="font-medium mt-1">{caseItem.title}</p>
                                <p className="text-sm text-gray-500 mt-1">{caseItem.customer}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  caseItem.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                                  caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {caseItem.status}
                                </span>
                                <p className="text-sm text-gray-500 mt-2">Updated {caseItem.updated}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Email Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Unread Emails</p>
                          <p className="text-2xl font-semibold">12</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Average Response Time</p>
                          <p className="text-2xl font-semibold">1.5h</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Daily Responses</p>
                          <p className="text-2xl font-semibold">45</p>
                        </div>
                      </div>

                      {/* Email List */}
                      <div className="space-y-3">
                        {[
                          {
                            subject: 'Account Verification Request',
                            customer: 'Jennifer Smith',
                            preview: 'I need help verifying my account...',
                            time: '15 mins ago',
                            priority: 'High',
                            status: 'Unread'
                          },
                          {
                            subject: 'Payment Confirmation',
                            customer: 'Robert Johnson',
                            preview: 'Could you confirm if my payment...',
                            time: '1 hour ago',
                            priority: 'Medium',
                            status: 'Read'
                          },
                          {
                            subject: 'Product Return Query',
                            customer: 'Emily Chen',
                            preview: 'I would like to return my recent purchase...',
                            time: '2 hours ago',
                            priority: 'Low',
                            status: 'Replied'
                          }
                        ].map((email, index) => (
                          <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-medium">{email.subject}</h3>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    email.status === 'Unread' ? 'bg-blue-100 text-blue-700' :
                                    email.status === 'Replied' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {email.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">{email.customer}</p>
                                <p className="text-sm text-gray-600">{email.preview}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">{email.time}</p>
                                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                  email.priority === 'High' ? 'bg-red-100 text-red-700' :
                                  email.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {email.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Reply Templates */}
                      <div>
                        <h3 className="font-medium mb-2">Quick Reply Templates</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="p-2 text-left border rounded hover:bg-gray-50 text-sm">
                            Account Verification Steps
                          </button>
                          <button className="p-2 text-left border rounded hover:bg-gray-50 text-sm">
                            Payment Confirmation
                          </button>
                          <button className="p-2 text-left border rounded hover:bg-gray-50 text-sm">
                            Return Process
                          </button>
                          <button className="p-2 text-left border rounded hover:bg-gray-50 text-sm">
                            General Support
                          </button>
                        </div>
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