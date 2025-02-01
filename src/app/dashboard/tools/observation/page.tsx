import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, MessageSquare, ThumbsUp, HeartHandshake } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

const mockReport = {
  metadata: {
    callDateTime: "2025-02-01 14:30 EST",
    agentName: "Sarah Johnson",
    customerIntent: "Billing dispute regarding recent charge",
    callOutline: "Customer called about an unexpected charge on their account. Agent verified identity, investigated the charge, found it was due to an automatic renewal, and explained the situation.",
    callOutcome: "Resolved - Agent explained the charge and updated auto-renewal preferences",
    customerSentiment: "Initially frustrated, satisfied by end of call"
  },
  scores: {
    greeting: { score: 4, feedback: "Clear introduction and identity verification" },
    rapport: { score: 5, feedback: "Excellent personal connection and active listening" },
    customerNeeds: { score: 4, feedback: "Good probing questions to understand the issue" },
    proposeSolution: { score: 5, feedback: "Clear explanation of charge and proactive solutions" },
    closing: { score: 4, feedback: "Proper summary and next steps provided" },
    empathy: { score: 5, feedback: "Strong empathy throughout the interaction" },
    compliance: { score: 5, feedback: "All required disclaimers and verifications completed" },
    customerSentiment: { score: 4, feedback: "Successfully turned frustrated customer to satisfied" }
  },
  coaching: {
    strengths: [
      "Exceptional rapport building skills",
      "Strong empathy throughout the call",
      "Clear and thorough explanation of the solution"
    ],
    improvements: [
      "Could strengthen closing by asking if customer has additional questions",
      "Consider offering proactive account review for future charges"
    ]
  }
};

const CallObservationReport = () => {
  const getScoreColor = (score: number) => {
    return score >= 4.5 ? themeClasses.success : 
           score >= 4.0 ? 'text-blue-500' : 
           score >= 3.0 ? 'text-yellow-500' : themeClasses.error;
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className={`text-3xl font-bold mb-8 ${themeClasses.textPrimary}`}>
        Call Observation Report
      </div>
      
      {/* Metadata Section */}
      <Card className="bg-[var(--card-background)]">
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${themeClasses.textPrimary}`}>
            <Clock className="h-5 w-5 text-blue-600" />
            Call Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Date & Time</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.callDateTime}</p>
          </div>
          <div>
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Agent Name</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.agentName}</p>
          </div>
          <div className="md:col-span-2">
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Customer Intent</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.customerIntent}</p>
          </div>
          <div className="md:col-span-2">
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Call Outline</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.callOutline}</p>
          </div>
          <div>
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Call Outcome</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.callOutcome}</p>
          </div>
          <div>
            <p className={`text-sm font-semibold ${themeClasses.textSecondary}`}>Customer Sentiment</p>
            <p className={themeClasses.textPrimary}>{mockReport.metadata.customerSentiment}</p>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Scores */}
      <Card className="bg-[var(--card-background)]">
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${themeClasses.textPrimary}`}>
            <ThumbsUp className="h-5 w-5 text-blue-600" />
            Performance Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(mockReport.scores).map(([category, data]) => (
            <div key={category} className="border-b border-[var(--card-border)] pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold capitalize ${themeClasses.textPrimary}`}>
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`font-bold ${getScoreColor(data.score)}`}>
                  {data.score}/5
                </span>
              </div>
              <p className={`text-sm ${themeClasses.textSecondary}`}>{data.feedback}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Coaching Section */}
      <Card className="bg-[var(--card-background)]">
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${themeClasses.textPrimary}`}>
            <HeartHandshake className="h-5 w-5 text-blue-600" />
            Coaching Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className={`font-semibold ${themeClasses.success} mb-2`}>Strengths</h3>
              <ul className="list-disc pl-5 space-y-2">
                {mockReport.coaching.strengths.map((strength, index) => (
                  <li key={index} className={`text-sm ${themeClasses.textPrimary}`}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold text-blue-600 mb-2`}>Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-2">
                {mockReport.coaching.improvements.map((improvement, index) => (
                  <li key={index} className={`text-sm ${themeClasses.textPrimary}`}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallObservationReport;