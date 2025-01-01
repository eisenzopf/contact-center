'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Clock, User, DollarSign, Calendar, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';

export default function CollectionsAgentPage() {
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
              <h2 className="font-semibold text-lg text-gray-900">Maria Garcia</h2>
              <p className="text-sm text-gray-700">Collections Agent • ID: CA-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-green-50 p-2 rounded-lg flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-gray-900 font-medium">Collections Today: $8,450</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">4:23:15</span>
            </div>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-full px-4 py-1.5 text-sm bg-white text-gray-900 font-medium"
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
              <TabsList className="bg-white">
                <TabsTrigger value="current" className="flex items-center data-[state=active]:text-gray-900">
                  <Phone className="h-4 w-4 mr-2" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="promises" className="flex items-center data-[state=active]:text-gray-900">
                  <Calendar className="h-4 w-4 mr-2" />
                  Promises
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center data-[state=active]:text-gray-900">
                  <FileText className="h-4 w-4 mr-2" />
                  Compliance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Current Collection Call</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Timer and Controls */}
                      <div className="flex justify-between items-center p-4 bg-white border rounded-lg">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">05:23</p>
                          <p className="text-sm text-gray-700">Call Duration</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">
                            End Call
                          </button>
                          <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
                            Hold
                          </button>
                        </div>
                      </div>

                      {/* Compliance Checklist */}
                      <div className="p-4 bg-white border rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">Required Disclosures</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-gray-300" />
                            <span className="text-gray-900">Mini-Miranda Warning</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-gray-300" />
                            <span className="text-gray-900">Recording Disclosure</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-gray-300" />
                            <span className="text-gray-900">Payment Authorization</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-center font-medium hover:bg-blue-100">
                          Take Payment
                        </button>
                        <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-center font-medium hover:bg-blue-100">
                          Payment Plan
                        </button>
                        <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-center font-medium hover:bg-blue-100">
                          Settlement
                        </button>
                      </div>

                      {/* Notes Section */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Call Notes</h3>
                        <textarea 
                          className="w-full h-32 p-3 border rounded-lg text-gray-900 placeholder-gray-500"
                          placeholder="Enter call notes and payment commitments..."
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
                <CardTitle className="text-gray-900">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Number</label>
                    <p className="font-semibold text-gray-900">#12345-6789</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Balance Due</label>
                    <p className="font-semibold text-red-600 text-lg">$2,450.00</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Past Due</label>
                    <p className="font-semibold text-gray-900">60 days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Payment</label>
                    <p className="font-semibold text-gray-900">$500 on Dec 15, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">$500</p>
                        <p className="text-sm text-gray-700">Dec 15, 2024</p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-white border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">$750</p>
                        <p className="text-sm text-gray-700">Dec 01, 2024</p>
                      </div>
                      <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        Failed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100">
                    Payment Plans
                  </button>
                  <button className="w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100">
                    Settlement Options
                  </button>
                  <button className="w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100">
                    Hardship Programs
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}