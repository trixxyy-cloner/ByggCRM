import { api } from './api';

export interface CustomerDto {
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

export const customerService = {
  async getCustomers(token: string): Promise<CustomerDto[]> {
    return api.get<CustomerDto[]>('/customers', token);
  },

  async getCustomerById(id: string, token: string): Promise<CustomerDto> {
    return api.get<CustomerDto>(`/customers/${id}`, token);
  },

  async createCustomer(data: CustomerDto, token: string): Promise<CustomerDto> {
    return api.post<CustomerDto>('/customers', data, token);
  },

  async updateCustomer(id: string, data: CustomerDto, token: string): Promise<CustomerDto> {
    return api.put<CustomerDto>(`/customers/${id}`, data, token);
  },

  async deleteCustomer(id: string, token: string): Promise<void> {
    await api.delete<void>(`/customers/${id}`, token);
  },
};