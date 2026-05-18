import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectDto } from '../services/projectService';

interface ProjectsViewProps {
  projects: ProjectDto[];
  onProjectsUpdate: (projects: ProjectDto[]) => void;
  onCreateProject: (project: ProjectDto) => Promise<void>;
  onUpdateProject: (id: string, project: ProjectDto) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export default function ProjectsView({ projects, onProjectsUpdate, onCreateProject, onUpdateProject, onDeleteProject }: ProjectsViewProps) {
  // === STATE: Filter projects by status ===
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'ongoing' | 'completed'>('all');

  // === FILTER LOGIC ===
  const filteredProjects = statusFilter === 'all' ? projects : projects.filter((p) => p.status === statusFilter);

  // === EVENT HANDLER: Add new project (demo) ===
  const handleAddProject = async () => {
    const newProject: ProjectDto = {
      id: String(Date.now()),
      name: 'New Project',
      client: 'Client Name',
      address: 'Street 123, City',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      budget: 500000,
      status: 'planning',
      progress: 0,
      team: [],
    };
    await onCreateProject(newProject);
    onProjectsUpdate([...projects, newProject]);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* === PAGE HEADER === */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 mt-2">Overview and management of all construction projects</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* === FILTER BUTTONS === */}
      <div className="flex gap-2">
        {['all', 'planning', 'ongoing', 'completed'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter as any)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              // === CONDITIONAL STYLING: Active filter ===
              statusFilter === filter
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* === PROJECTS GRID (3 columns) === */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onUpdateProject={onUpdateProject} onDeleteProject={onDeleteProject} />
          ))}
        </div>
      ) : (
        // === CONDITIONAL RENDERING: Empty State ===
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No projects found</h3>
          <p className="text-gray-600 text-sm mb-6">Try adjusting your filters or add a new project</p>
          <button
            onClick={handleAddProject}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
}