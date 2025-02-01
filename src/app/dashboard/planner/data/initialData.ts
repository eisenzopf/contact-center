export const initialHierarchy: Hierarchy = {
  sections: [
    {
      id: 'goals',
      title: 'Set Goals',
      expanded: true,
      items: [
        {
          id: 1,
          title: 'Increase Market Share by 25%',
          expanded: true,
          details: 'Target emerging markets in Asia and South America',
          subtasks: [
            { id: 1, title: 'Market Analysis Complete', status: 'completed' },
            { id: 2, title: 'Entry Strategy Development', status: 'in-progress' },
            { id: 3, title: 'Partner Identification', status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 'insights',
      title: 'Find Insights',
      expanded: true,
      items: [
        {
          id: 2,
          title: 'Market Analysis',
          expanded: false,
          details: 'Key findings suggest strong demand in Southeast Asia',
          subtasks: [
            { id: 4, title: 'Data Collection', status: 'completed' },
            { id: 5, title: 'Competitor Analysis', status: 'completed' },
            { id: 6, title: 'Consumer Research', status: 'in-progress' }
          ]
        }
      ]
    },
    {
      id: 'actions',
      title: 'Take Action',
      expanded: true,
      items: [
        {
          id: 3,
          title: 'Launch Marketing Campaign',
          expanded: false,
          details: 'Focus on digital channels and local partnerships',
          subtasks: [
            { id: 7, title: 'Social Media Strategy', status: 'in-progress' },
            { id: 8, title: 'Content Creation', status: 'pending' },
            { id: 9, title: 'Influencer Partnerships', status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 'progress',
      title: 'Track Progress',
      expanded: true,
      items: [
        {
          id: 4,
          title: 'Q1 Results',
          expanded: false,
          details: 'Market Share Growth: 8.5%',
          subtasks: [
            { id: 10, title: 'Sales Metrics', status: 'completed' },
            { id: 11, title: 'Market Penetration', status: 'in-progress' },
            { id: 12, title: 'ROI Analysis', status: 'pending' }
          ]
        }
      ]
    }
  ],
  tools: [
    {
      id: 1,
      title: 'Scorecard',
      type: 'scorecard',
      path: '/dashboard/tools/scorecard',
      status: 'active'
    },
    {
      id: 2,
      title: 'Call Observation',
      type: 'observation',
      path: '/dashboard/tools/observation',
      status: 'active'
    }
  ],
  chatHistory: []
}; 