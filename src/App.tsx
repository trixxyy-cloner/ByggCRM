import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import ProjectsView from './components/ProjectsView';
import { mockProjects, mockCustomers, mockStats } from './mockData';
import { ViewType, Project, Customer, DashboardStats } from './types';

export default function App() {
  // === STATE MANAGEMENT ===
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [stats, setStats] = useState<DashboardStats>(mockStats);

  // === LIFECYCLE HOOK: Load stats from localStorage on mount ===
  useEffect(() => {
    const savedStats = localStorage.getItem('byggcrm_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Could not load stats from localStorage', e);
      }
    }
  }, []);

  // === LIFECYCLE HOOK: Save stats to localStorage when they change ===
  useEffect(() => {
    localStorage.setItem('byggcrm_stats', JSON.stringify(stats));
  }, [stats]);

  // === FILTER FUNCTIONS FOR SEARCH ===
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // === EVENT HANDLERS ===
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* === HEADER - Search and notifications === */}
      <Header onSearch={handleSearch} />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* === SIDEBAR - Navigation between views === */}
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />

        {/* === MAIN CONTENT - Conditional rendering based on current view === */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              stats={stats}
              projects={filteredProjects}
              customers={filteredCustomers}
            />
          )}
          {currentView === 'customers' && (
            <CustomersView
              customers={filteredCustomers}
              onCustomersUpdate={setCustomers}
            />
          )}
          {currentView === 'projects' && (
            <ProjectsView
              projects={filteredProjects}
              onProjectsUpdate={setProjects}
            />
          )}
        </main>
      </div>
    </div>
  );
}