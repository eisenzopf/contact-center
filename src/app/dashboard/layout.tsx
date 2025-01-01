export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <a href="/dashboard" className="flex items-center">
                  <span className="text-xl font-semibold">Contact Center</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    );
  }