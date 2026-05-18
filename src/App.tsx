import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import ProjectsView from './components/ProjectsView';
import { ViewType, DashboardStats } from './types';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import { projectService, ProjectDto } from './services/projectService';
import { customerService, CustomerDto } from './services/customerService';

export default function App() {
  const { user, token, logout } = useAuth();

  // === STATE MANAGEMENT ===
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ activeProjects: 0, totalCustomers: 0, totalRevenue: 0, completedProjects: 0 });
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  // === LIFECYCLE HOOK: Fetch data from backend ===
  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  // === LIFECYCLE HOOK: Track new notifications ===
  useEffect(() => {
    if (projects.length > 0 && customers.length > 0) {
      setHasNewNotifications(true);
      setNewNotificationCount(projects.length + customers.length);
    }
  }, [projects, customers]);

  const loadData = async () => {
    try {
      const [projectsData, customersData] = await Promise.all([
        projectService.getProjects(token!),
        customerService.getCustomers(token!),
      ]);

      setProjects(projectsData);
      setCustomers(customersData);

      // Calculate stats
      const activeProjects = projectsData.filter(p => p.status === 'ongoing').length;
      const completedProjects = projectsData.filter(p => p.status === 'completed').length;
      const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0);

      setStats({
        activeProjects,
        totalCustomers: customersData.length,
        totalRevenue,
        completedProjects,
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

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

  const handleLogout = () => {
    logout();
  };

  // === CREATE PROJECT ===
  const handleCreateProject = async (newProject: ProjectDto) => {
    try {
      const created = await projectService.createProject(newProject, token!);
      setProjects([...projects, created]);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  // === UPDATE PROJECT ===
  const handleUpdateProject = async (projectId: string, updatedProject: ProjectDto) => {
    try {
      const updated = await projectService.updateProject(projectId, updatedProject, token!);
      setProjects(projects.map(p => p.id === projectId ? updated : p));
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  // === DELETE PROJECT ===
  const handleDeleteProject = async (projectId: string) => {
    try {
      await projectService.deleteProject(projectId, token!);
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  // === CREATE CUSTOMER ===
  const handleCreateCustomer = async (newCustomer: CustomerDto) => {
    try {
      const created = await customerService.createCustomer(newCustomer, token!);
      setCustomers([...customers, created]);
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  // === UPDATE CUSTOMER ===
  const handleUpdateCustomer = async (customerId: string, updatedCustomer: CustomerDto) => {
    try {
      const updated = await customerService.updateCustomer(customerId, updatedCustomer, token!);
      setCustomers(customers.map(c => c.id === customerId ? updated : c));
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  // === DELETE CUSTOMER ===
  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await customerService.deleteCustomer(customerId, token!);
      setCustomers(customers.filter(c => c.id !== customerId));
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  // === REDIRECT TO LOGIN IF NOT AUTHENTICATED ===
  if (!token || !user) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* === HEADER - Search and notifications === */}
      <Header 
        onSearch={handleSearch} 
        onLogout={handleLogout} 
        userName={user?.fullName}
        userEmail={user?.email}
        hasNewNotifications={hasNewNotifications}
        newNotificationCount={newNotificationCount}
        onNotificationsRead={() => setHasNewNotifications(false)}
      />

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
              onCreateCustomer={handleCreateCustomer}
              onUpdateCustomer={handleUpdateCustomer}
              onDeleteCustomer={handleDeleteCustomer}
            />
          )}
          {currentView === 'projects' && (
            <ProjectsView
              projects={filteredProjects}
              onProjectsUpdate={setProjects}
              onCreateProject={handleCreateProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
            />
          )}
        </main>
      </div>
    </div>
  );
}