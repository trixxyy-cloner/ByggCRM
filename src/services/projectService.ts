import { api } from './api';

export interface ProjectDto {
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

export const projectService = {
  async getProjects(token: string): Promise<ProjectDto[]> {
    return api.get<ProjectDto[]>('/projects', token);
  },

  async getProjectById(id: string, token: string): Promise<ProjectDto> {
    return api.get<ProjectDto>(`/projects/${id}`, token);
  },

  async createProject(data: ProjectDto, token: string): Promise<ProjectDto> {
    return api.post<ProjectDto>('/projects', data, token);
  },

  async updateProject(id: string, data: ProjectDto, token: string): Promise<ProjectDto> {
    return api.put<ProjectDto>(`/projects/${id}`, data, token);
  },

  async deleteProject(id: string, token: string): Promise<void> {
    await api.delete<void>(`/projects/${id}`, token);
  },
};

