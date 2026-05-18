import { BarChart3, TrendingUp, Users, CheckCircle } from 'lucide-react';
import StatCard from './StatCard';
import ProjectCard from './ProjectCard';
import CustomerCard from './CustomerCard';
import { Project, Customer, DashboardStats } from '../types';

interface DashboardViewProps {
  stats: DashboardStats;
  projects: Project[];
  customers: Customer[];
}

export default function DashboardView({
  stats,
  projects,
  customers,
}: DashboardViewProps) {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* === PAGE HEADER === */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Overview of your projects and customers</p>
      </div>

      {/* === STATS GRID (4 columns) === */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={<BarChart3 className="w-5 h-5" />}
          color="blue"
          trend="+2 from last month"
          storageKey="stat_activeProjects"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<Users className="w-5 h-5" />}
          color="green"
          trend="3 new this month"
          storageKey="stat_totalCustomers"
        />
        <StatCard
          title="Total Revenue"
          value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
          trend="In active projects"
          storageKey="stat_revenue"
        />
        <StatCard
          title="Completed"
          value={stats.completedProjects}
          icon={<CheckCircle className="w-5 h-5" />}
          color="orange"
          trend="This quarter"
          storageKey="stat_completedProjects"
        />
      </div>

      {/* === QUICK STATS CARD === */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Active Projects</span>
            <span className="text-2xl font-bold text-blue-600">{stats.activeProjects}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Total Customers</span>
            <span className="text-2xl font-bold text-green-600">{stats.totalCustomers}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Revenue</span>
            <span className="text-2xl font-bold text-purple-600">
              {(stats.totalRevenue / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Completed Projects</span>
            <span className="text-2xl font-bold text-gray-600">{stats.completedProjects}</span>
          </div>
        </div>

        <button className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
          View More
        </button>
      </div>

      {/* === CONTENT GRID (2 columns) === */}
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* === ONGOING PROJECTS SECTION === */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Ongoing Projects</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {projects.filter((p) => p.status === 'ongoing').length} active
            </span>
          </div>

          <div className="space-y-4">
            {projects
              .filter((project) => project.status === 'ongoing')
              .slice(0, 3)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>

        {/* === RECENT CUSTOMERS SECTION === */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Recent Customers</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              {customers.length} total
            </span>
          </div>

          <div className="space-y-4">
            {customers.slice(0, 3).map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
      </div>

      {/* === SUMMARY STATS === */}
      <div className="grid gap-4 md:grid-cols-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
        <div>
          <p className="text-gray-600 text-sm mb-2">Average Project Value</p>
          <p className="text-2xl font-bold text-gray-900">
            {projects.length > 0
              ? (projects.reduce((acc, p) => acc + p.budget, 0) / projects.length).toLocaleString()
              : '0'}{' '}
            kr
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-2">Completion Rate</p>
          <p className="text-2xl font-bold text-gray-900">
            {projects.length > 0
              ? (
                  (projects.filter((p) => p.status === 'completed').length / projects.length) *
                  100
                ).toFixed(0)
              : '0'}
            %
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-2">Avg Team Size</p>
          <p className="text-2xl font-bold text-gray-900">
            {projects.length > 0
              ? (projects.reduce((acc, p) => acc + p.team.length, 0) / projects.length).toFixed(1)
              : '0'}
          </p>
        </div>
      </div>
    </div>
  );
}