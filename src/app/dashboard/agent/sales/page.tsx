'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageSquare, Clock, User, DollarSign, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function SalesAgentPage() {
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
              <h2 className="font-semibold text-lg">Robert Chen</h2>
              <p className="text-sm text-gray-500">Sales Agent • ID: SA-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-green-50 p-2 rounded-lg flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span>Daily Sales: $4,250</span>
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
                <TabsTrigger value="leads" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Leads
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Call</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-lg font-semibold">05:23</p>
                          <p className="text-sm text-gray-500">Call Duration</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            End Call
                          </button>
                          <button className="bg-gray-200 px-4 py-2 rounded-lg">
                            Hold
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Create Quote
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Product Catalog
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leads">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Lead Cards */}
                      {[
                        { name: 'Michael Johnson', company: 'Tech Solutions Inc.', interest: 'Enterprise Package', score: 85 },
                        { name: 'Sarah Williams', company: 'Growth Corp', interest: 'Professional Suite', score: 78 },
                        { name: 'David Chen', company: 'Innovate Labs', interest: 'Basic Package', score: 72 },
                      ].map((lead, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{lead.name}</h3>
                              <p className="text-sm text-gray-500">{lead.company}</p>
                              <p className="text-sm text-gray-600 mt-1">Interested in: {lead.interest}</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                                Score: {lead.score}
                              </div>
                              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                                Start Call
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Communications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Email Templates */}
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Follow-up Template
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Quote Template
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Meeting Request
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                          Thank You Note
                        </button>
                      </div>

                      {/* Email Composer */}
                      <div className="space-y-3 mt-6">
                        <div>
                          <label className="text-sm text-gray-500">To:</label>
                          <input 
                            type="text" 
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Recipient email"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Subject:</label>
                          <input 
                            type="text" 
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Email subject"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Message:</label>
                          <textarea 
                            className="w-full h-32 border rounded-lg p-2 mt-1"
                            placeholder="Type your message here..."
                          />
                        </div>
                        <div className="flex justify-end">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Send Email
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
                    <p className="font-medium">John Smith</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Company</label>
                    <p className="font-medium">Smith Enterprises</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Current Products</label>
                    <p className="font-medium">Basic Package</p>
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