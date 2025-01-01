'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Clock, User, DollarSign, Calendar, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';
import { themeClasses } from '@/lib/theme';

export default function CollectionsAgentPage() {
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
              <h2 className={`font-semibold text-lg ${themeClasses.textPrimary}`}>Sarah Johnson</h2>
              <p className={themeClasses.textSecondary}>Collections Agent • ID: CA-1234</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="bg-green-50 p-2 rounded-lg flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className={themeClasses.textPrimary}>Recovery Rate: 82%</span>
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
                <TabsTrigger value="current" className={`flex items-center ${themeClasses.textPrimary}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="promises" className={`flex items-center ${themeClasses.textPrimary}`}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Promises
                </TabsTrigger>
                <TabsTrigger value="compliance" className={`flex items-center ${themeClasses.textPrimary}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Compliance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <Card>
                  <CardHeader>
                    <CardTitle className={themeClasses.textPrimary}>Current Collection Case</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Timer and Controls */}
                      <div className="flex justify-between items-center p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <div>
                          <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>05:23</p>
                          <p className={themeClasses.textSecondary}>Call Duration</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">
                            End Call
                          </button>
                          <button className="bg-[var(--card-background)] text-[var(--foreground)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--card-background-hover)] border border-[var(--card-border)]">
                            Hold
                          </button>
                        </div>
                      </div>

                      {/* Compliance Checklist */}
                      <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Required Disclosures</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <span className={themeClasses.textPrimary}>Mini-Miranda Warning</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <span className={themeClasses.textPrimary}>Recording Disclosure</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <span className={themeClasses.textPrimary}>Payment Authorization</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-[var(--primary)] text-white rounded-lg text-center font-medium hover:bg-[var(--primary-hover)]">
                          Take Payment
                        </button>
                        <button className="p-3 bg-[var(--primary)] text-white rounded-lg text-center font-medium hover:bg-[var(--primary-hover)]">
                          Payment Plan
                        </button>
                        <button className="p-3 bg-[var(--primary)] text-white rounded-lg text-center font-medium hover:bg-[var(--primary-hover)]">
                          Settlement
                        </button>
                      </div>

                      {/* Notes Section */}
                      <div>
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-2`}>Call Notes</h3>
                        <textarea 
                          className="w-full h-32 p-3 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] text-[var(--foreground)]"
                          placeholder="Enter call notes and payment commitments..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="promises">
                <Card>
                  <CardHeader>
                    <CardTitle className={themeClasses.textPrimary}>Payment Promises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Promise List */}
                      <div className="space-y-3">
                        <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`font-semibold ${themeClasses.textPrimary}`}>John Smith - #AC-5678</p>
                              <p className={themeClasses.textSecondary}>Promise Amount: $750</p>
                              <p className={themeClasses.textSecondary}>Due Date: Jan 15, 2024</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
                              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">Follow Up</button>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`font-semibold ${themeClasses.textPrimary}`}>Mary Johnson - #AC-5679</p>
                              <p className={themeClasses.textSecondary}>Promise Amount: $500</p>
                              <p className={themeClasses.textSecondary}>Due Date: Jan 20, 2024</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Confirmed</span>
                              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add New Promise */}
                      <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Record New Promise</h3>
                        <div className="space-y-3">
                          <div>
                            <label className={`block text-sm ${themeClasses.textSecondary} mb-1`}>Amount</label>
                            <input 
                              type="text" 
                              placeholder="Enter amount" 
                              className="w-full p-2 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] text-[var(--foreground)]"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm ${themeClasses.textSecondary} mb-1`}>Due Date</label>
                            <input 
                              type="date" 
                              className="w-full p-2 border border-[var(--card-border)] rounded-lg bg-[var(--card-background)] text-[var(--foreground)]"
                            />
                          </div>
                          <button className="w-full p-3 bg-[var(--primary)] text-white rounded-lg text-center font-medium hover:bg-[var(--primary-hover)]">
                            Record Promise
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance">
                <Card>
                  <CardHeader>
                    <CardTitle className={themeClasses.textPrimary}>Compliance Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Required Disclosures */}
                      <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Required Disclosures</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>Mini-Miranda Warning</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Must be stated at the beginning of each call</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>FDCPA Disclosure</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Consumer rights and dispute process</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>Call Recording Notice</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Inform about call recording and monitoring</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Communication Restrictions */}
                      <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Communication Restrictions</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                              <span className="text-yellow-700">Preferred Contact Time: 2PM - 6PM</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                              <span className="text-red-700">Do Not Call Work Number</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Documentation Requirements */}
                      <div className="p-4 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                        <h3 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Documentation Requirements</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>Payment Authorization</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Verbal consent for payment processing</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>Settlement Terms</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Document all settlement agreements</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 mr-3 border-2 border-[var(--card-border)]" />
                            <div>
                              <p className={themeClasses.textPrimary}>Dispute Documentation</p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>Record any disputes or complaints</p>
                            </div>
                          </div>
                        </div>
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
                <CardTitle className={themeClasses.textPrimary}>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className={themeClasses.textSecondary}>Account Number</label>
                    <p className={`font-semibold ${themeClasses.textPrimary}`}>#12345-6789</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>Balance Due</label>
                    <p className="font-semibold text-red-600 text-lg">$2,450.00</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>Past Due</label>
                    <p className={`font-semibold ${themeClasses.textPrimary}`}>60 days</p>
                  </div>
                  <div>
                    <label className={themeClasses.textSecondary}>Last Payment</label>
                    <p className={`font-semibold ${themeClasses.textPrimary}`}>$500 on Dec 15, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-semibold ${themeClasses.textPrimary}`}>$500</p>
                        <p className={themeClasses.textSecondary}>Dec 15, 2024</p>
                      </div>
                      <span className={themeClasses.success}>Completed</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-semibold ${themeClasses.textPrimary}`}>$750</p>
                        <p className={themeClasses.textSecondary}>Dec 01, 2024</p>
                      </div>
                      <span className={themeClasses.error}>Failed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={themeClasses.textPrimary}>Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className={`w-full p-3 text-left bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg font-medium hover:bg-[var(--card-background-hover)] ${themeClasses.textPrimary}`}>
                    Payment Plans
                  </button>
                  <button className={`w-full p-3 text-left bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg font-medium hover:bg-[var(--card-background-hover)] ${themeClasses.textPrimary}`}>
                    Settlement Options
                  </button>
                  <button className={`w-full p-3 text-left bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg font-medium hover:bg-[var(--card-background-hover)] ${themeClasses.textPrimary}`}>
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