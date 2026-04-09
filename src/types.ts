// Projekt typer
export interface Project {
    id: string;
    name: string;
    client: string;
    address: string;
    startDate: string;
    endDate: string;
    budget: number;
    status: 'planning' | 'ongoing' | 'completed';
    progress: number;
    team: string[];
}

// Kund typer
export interface Customer {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    projects: number;
    totalSpent: number;
    joinDate: string;
}

// Stats typer (för Dashboard)
export interface DashboardStats {
    activeProjects: number;
    totalCustomers: number;
    totalRevenue: number;
    completedProjects: number;
}

// Navigations typer
export type ViewType = 'dashboard' | 'customers' | 'projects';