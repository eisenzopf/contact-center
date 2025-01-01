'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageSquare, Clock, User, Wrench, BookOpen, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { themeClasses } from '@/lib/theme';

export default function TechSupportAgentPage() {
  const [status, setStatus] = useState('available');
  
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Navigation Bar */}
      <div className="bg-[var(--card-background)] border-b border-[var(--card-border)]">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className={`font-semibold text-lg ${themeClasses.textPrimary}`}>Alex Chen</h2>
              <p className={themeClasses.textSecondary}>Tech Support • ID: TS-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-purple-50 p-2 rounded-lg flex items-center">
              <Wrench className="h-5 w-5 text-purple-500 mr-2" />
              <span className={themeClasses.textPrimary}>Resolution Rate: 92%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className={themeClasses.textSecondary}>4:23:15</span>
            </div>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-full px-4 py-1.5 text-sm bg-[var(--card-background)]"
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
              <TabsList className="bg-[var(--card-background)]">
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
                    <CardTitle className={themeClasses.textPrimary}>Current Technical Support Case</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Timer and Controls */}
                      <div className="flex justify-between items-center p-4 bg-[var(--card-background)] rounded-lg">
                        <div>
                          <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>05:23</p>
                          <p className={themeClasses.textSecondary}>Call Duration</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-[var(--destructive)] text-white px-4 py-2 rounded-lg">
                            End Call
                          </button>
                          <button className="bg-[var(--card-background)] px-4 py-2 rounded-lg border border-[var(--card-border)]">
                            Hold
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg text-center hover:bg-[var(--card-background-hover)]">
                          Knowledge Base
                        </button>
                        <button className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg text-center hover:bg-[var(--card-background-hover)]">
                          Create Ticket
                        </button>
                      </div>

                      {/* Support Notes */}
                      <div>
                        <h3 className={`font-medium ${themeClasses.textPrimary} mb-2`}>Technical Notes</h3>
                        <textarea 
                          className="w-full h-32 p-3 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] text-[var(--foreground)]"
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
                <CardTitle className={themeClasses.textPrimary}>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className={themeClasses.textSecondary}>Customer Name</label>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>Michael Brown</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>Product Version</label>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>Enterprise Suite v3.2</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>Support Level</label>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>Premium</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>System Info</label>
                    <p className={`text-sm mt-1 ${themeClasses.textPrimary}`}>Windows Server 2022</p>
                    <p className={`text-sm ${themeClasses.textPrimary}`}>16GB RAM, 4 CPU Cores</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Last Update: 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${themeClasses.textPrimary}`}>Database Connection</p>
                      <span className={themeClasses.success}>Resolved</span>
                    </div>
                    <p className={`text-sm mt-1 ${themeClasses.textSecondary}`}>3 days ago</p>
                  </div>
                  <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${themeClasses.textPrimary}`}>API Integration</p>
                      <span className={themeClasses.success}>Resolved</span>
                    </div>
                    <p className={`text-sm mt-1 ${themeClasses.textSecondary}`}>5 days ago</p>
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