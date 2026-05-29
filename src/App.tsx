import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import ProjectsView from './components/ProjectsView';
import { ViewType, DashboardStats } from './types';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import { projectService, ProjectDto } from './services/projectService';
import { customerService, CustomerDto } from './services/customerService';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

export default function App() {
  const { user, token, logout } = useAuth();

  // === STATE MANAGEMENT ===
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ activeProjects: 0, totalCustomers: 0, totalRevenue: 0, completedProjects: 0 });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // === LIFECYCLE HOOK: Fetch data from backend ===
  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  // === LIFECYCLE HOOK: Recalculate stats when projects/customers change ===
  useEffect(() => {
    const activeProjects = projects.filter(p => p.status === 'ongoing').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

    setStats({
      activeProjects,
      totalCustomers: customers.length,
      totalRevenue,
      completedProjects,
    });
  }, [projects, customers]);

  const loadData = async () => {
    try {
      const [projectsData, customersData] = await Promise.all([
        projectService.getProjects(token!),
        customerService.getCustomers(token!),
      ]);

      setProjects(projectsData);
      setCustomers(customersData);
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

  // === GENERIC CRUD HANDLERS ===
  const createEntity = async <T extends { id: string }>(
    entity: T,
    setState: (items: T[]) => void,
    state: T[],
    service: { create: (item: T, token: string) => Promise<T> },
    entityName: string
  ) => {
    try {
      const created = await service.create(entity, token!);
      setState([...state, created]);
      
      const notification: Notification = {
        id: String(Date.now()),
        message: `${entityName} "${(created as any).name || (created as any).company}" skapad!`,
        timestamp: new Date(),
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      console.error(`Failed to create ${entityName}:`, error);
    }
  };

  const updateEntity = async <T extends { id: string }>(
    entityId: string,
    entity: T,
    setState: (items: T[]) => void,
    state: T[],
    service: { update: (id: string, item: T, token: string) => Promise<T> },
    entityName: string
  ) => {
    try {
      const updated = await service.update(entityId, entity, token!);
      setState(state.map(item => item.id === entityId ? updated : item));
    } catch (error) {
      console.error(`Failed to update ${entityName}:`, error);
    }
  };

  const deleteEntity = async <T extends { id: string; name?: string; company?: string }>(
    entityId: string,
    setState: (items: T[]) => void,
    state: T[],
    service: { delete: (id: string, token: string) => Promise<void> },
    entityName: string
  ) => {
    try {
      const entityDisplay = state.find(item => item.id === entityId);
      const displayName = (entityDisplay as any)?.name || (entityDisplay as any)?.company || entityName;
      
      await service.delete(entityId, token!);
      setState(state.filter(item => item.id !== entityId));
      
      const notification: Notification = {
        id: String(Date.now()),
        message: `${entityName} "${displayName}" raderat`,
        timestamp: new Date(),
      };
      setNotifications([notification, ...notifications]);
    } catch (error) {
      // If it's a 404, still remove from frontend
      if ((error as Error).message.includes('Resursen hittades inte')) {
        const entityDisplay = state.find(item => item.id === entityId);
        const displayName = (entityDisplay as any)?.name || (entityDisplay as any)?.company || entityName;
        setState(state.filter(item => item.id !== entityId));
        
        const notification: Notification = {
          id: String(Date.now()),
          message: `${entityName} "${displayName}" raderat (fanns inte på server)`,
          timestamp: new Date(),
        };
        setNotifications([notification, ...notifications]);
      } else {
        console.error(`Failed to delete ${entityName}:`, error);
      }
    }
  };

  // === WRAPPERS FOR PROJECTS ===
  const handleCreateProject = (newProject: ProjectDto) =>
    createEntity(newProject, setProjects, projects, projectService as any, 'Projekt');

  const handleUpdateProject = (projectId: string, updatedProject: ProjectDto) =>
    updateEntity(projectId, updatedProject, setProjects, projects, projectService as any, 'Projekt');

  const handleDeleteProject = (projectId: string) =>
    deleteEntity(projectId, setProjects, projects, projectService as any, 'Projekt');

  // === WRAPPERS FOR CUSTOMERS ===
  const handleCreateCustomer = (newCustomer: CustomerDto) =>
    createEntity(newCustomer, setCustomers, customers, customerService as any, 'Kund');

  const handleUpdateCustomer = (customerId: string, updatedCustomer: CustomerDto) =>
    updateEntity(customerId, updatedCustomer, setCustomers, customers, customerService as any, 'Kund');

  const handleDeleteCustomer = (customerId: string) =>
    deleteEntity(customerId, setCustomers, customers, customerService as any, 'Kund');

  // === REDIRECT TO LOGIN IF NOT AUTHENTICATED ===
  if (!token || !user) {
    return <LoginPage />;
  }

  return (
    <ErrorBoundary>
    <div className="flex flex-col h-screen bg-gray-50">
      {/* === HEADER - Search and notifications === */}
      <Header 
        onSearch={handleSearch} 
        onLogout={handleLogout} 
        userName={user?.fullName}
        userEmail={user?.email}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
        onDismissNotification={(id) => setNotifications(notifications.filter(n => n.id !== id))}
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* === SIDEBAR - Navigation between views === */}
        <Sidebar currentView={currentView} onViewChange={handleViewChange} stats={stats} />

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
    </ErrorBoundary>
  );
}