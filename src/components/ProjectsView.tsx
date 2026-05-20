import { useState } from 'react';
import { Plus, X } from 'lucide-react';
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'ongoing' | 'completed'>('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    address: '',
    startDate: '',
    endDate: '',
    budget: 0,
    status: 'planning' as const,
  });

  const filteredProjects = statusFilter === 'all' ? projects : projects.filter((p) => p.status === statusFilter);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.client || !formData.address) {
      alert('Vänligen fyll i projektnamn, klient och adress');
      return;
    }

    const newProject: ProjectDto = {
      id: String(Date.now()),
      ...formData,
      progress: 0,
      team: [],
    };

    await onCreateProject(newProject);
    onProjectsUpdate([...projects, newProject]);
    setFormData({ name: '', client: '', address: '', startDate: '', endDate: '', budget: 0, status: 'planning' });
    setShowModal(false);
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
          onClick={() => setShowModal(true)}
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
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Create First Project
          </button>
        </div>
      )}

      {/* === MODAL: Create Project === */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Skapa nytt projekt</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Projektnamn"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="client"
                placeholder="Klient"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Adress"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Startdatum</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slutdatum</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (SEK)</label>
                <input
                  type="number"
                  name="budget"
                  placeholder="0"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planning">Planering</option>
                <option value="ongoing">Pågående</option>
                <option value="completed">Färdig</option>
              </select>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Skapa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}