import { LayoutDashboard, Users, FolderKanban } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  // === NAVIGATION MENU ITEMS ===
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
  ] as const;

  // === EVENT HANDLER: Navigation click ===
  const handleNavigationClick = (view: ViewType) => {
    onViewChange(view);
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 shadow-sm min-h-[calc(100vh-81px)] animate-slide-in-left">
      <nav className="p-4 space-y-2">
        {/* === RENDER NAVIGATION BUTTONS === */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigationClick(item.id as ViewType)}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-all duration-200 ${
                // === CONDITIONAL STYLING: Active/Inactive state ===
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* === QUICK STATS SECTION === */}
      <div className="p-4 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
          
          <div className="space-y-3">
            {/* Active Projects */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Active Projects</span>
              <span className="text-sm font-bold text-blue-700">8</span>
            </div>

            {/* Total Customers */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Total Customers</span>
              <span className="text-sm font-bold text-green-700">24</span>
            </div>

            {/* Revenue */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Revenue</span>
              <span className="text-sm font-bold text-purple-700">2.4M</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            View More
          </button>
        </div>
      </div>

      {/* === FOOTER SECTION === */}
      <div className="p-4 mt-auto border-t border-gray-200">
        <button className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-left">
          Settings
        </button>
        <button className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-left">
          Help
        </button>
      </div>
    </aside>
  );
}

