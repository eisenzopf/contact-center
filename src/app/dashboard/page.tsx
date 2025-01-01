export default function DashboardPage() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Contact Center Prototype</h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Agent Views</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/agent/sales" className="p-4 border rounded-lg hover:bg-gray-50">Sales Agent Workspace</a>
            <a href="/dashboard/agent/service" className="p-4 border rounded-lg hover:bg-gray-50">Service Agent Workspace</a>
            <a href="/dashboard/agent/tech-support" className="p-4 border rounded-lg hover:bg-gray-50">Tech Support Agent Workspace</a>
            <a href="/dashboard/agent/collections" className="p-4 border rounded-lg hover:bg-gray-50">Collections Agent Workspace</a>
          </div>
          
          <h2 className="text-xl font-semibold">Manager Views</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/manager/sales" className="p-4 border rounded-lg hover:bg-gray-50">Sales Manager Dashboard</a>
            <a href="/dashboard/manager/service" className="p-4 border rounded-lg hover:bg-gray-50">Service Manager Dashboard</a>
            <a href="/dashboard/manager/tech-support" className="p-4 border rounded-lg hover:bg-gray-50">Tech Support Manager Dashboard</a>
            <a href="/dashboard/manager/collections" className="p-4 border rounded-lg hover:bg-gray-50">Collections Manager Dashboard</a>
          </div>
          
          <h2 className="text-xl font-semibold">Executive View</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/executive" className="p-4 border rounded-lg hover:bg-gray-50">Executive Dashboard</a>
          </div>
        </div>
      </div>
    );
  }