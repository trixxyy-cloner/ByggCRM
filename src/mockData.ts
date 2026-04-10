import { Project, Customer, DashboardStats } from './types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Renovering Villavägen 5',
    client: 'Anders Svensson',
    address: 'Villavägen 5, Stockholm',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 450000,
    status: 'ongoing',
    progress: 65,
    team: ['Johan', 'Maria', 'Per'],
  },
  {
    id: '2',
    name: 'Byggexpansion AB Lager',
    client: 'Byggexpansion AB',
    address: 'Industrivägen 12, Västerås',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    budget: 1200000,
    status: 'ongoing',
    progress: 45,
    team: ['Thomas', 'Lisa', 'Erik', 'Sofia'],
  },
  {
    id: '3',
    name: 'Ombyggnad Centralgatan 8',
    client: 'Fastighets AB Central',
    address: 'Centralgatan 8, Göteborg',
    startDate: '2023-09-01',
    endDate: '2024-03-30',
    budget: 800000,
    status: 'completed',
    progress: 100,
    team: ['Johan', 'Per'],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Anders Svensson',
    company: 'Privat',
    email: 'anders@example.com',
    phone: '+46701234567',
    address: 'Villavägen 5, Stockholm',
    projects: 2,
    totalSpent: 650000,
    joinDate: '2023-06-15',
  },
  {
    id: '2',
    name: 'Byggexpansion AB',
    company: 'Byggexpansion AB',
    email: 'info@byggexpansion.se',
    phone: '+46850001234',
    address: 'Industrivägen 12, Västerås',
    projects: 3,
    totalSpent: 2450000,
    joinDate: '2022-01-10',
  },
  {
    id: '3',
    name: 'Fastighets AB Central',
    company: 'Fastighets AB',
    email: 'kontakt@fastighetsab.se',
    phone: '+46850004567',
    address: 'Centralgatan 8, Göteborg',
    projects: 1,
    totalSpent: 800000,
    joinDate: '2023-09-01',
  },
];

export const mockStats: DashboardStats = {
  activeProjects: 2,
  totalCustomers: 3,
  totalRevenue: 2450000,
  completedProjects: 1,
};