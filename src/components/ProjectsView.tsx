import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { ProjectDto } from '../services/projectService';
import Modal from './Modal';
import FormInput from './FormInput';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import FormButtonGroup from './FormButtonGroup';

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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
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
        <EmptyState
          title="No projects found"
          description="Try adjusting your filters or add a new project"
          buttonText="Create First Project"
          onButtonClick={() => setShowModal(true)}
        />
      )}

      {/* === MODAL: Create Project === */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Skapa nytt projekt">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* === LOADING SPINNER === */}
          {isLoading && <LoadingSpinner text="Sparar projekt..." />}
          
          <FormInput
            label="Projektnamn"
            type="text"
            name="name"
            placeholder="Projektnamn"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Klient"
            type="text"
            name="client"
            placeholder="Klient"
            value={formData.client}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Adress"
            type="text"
            name="address"
            placeholder="Adress"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Startdatum"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <FormInput
            label="Slutdatum"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <FormInput
            label="Budget (SEK)"
            type="number"
            name="budget"
            placeholder="0"
            value={formData.budget}
            onChange={handleInputChange}
          />
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

          <FormButtonGroup
            onCancel={() => setShowModal(false)}
            submitText="Skapa"
            cancelText="Avbryt"
            isLoading={isLoading}
          />
        </form>
      </Modal>
    </div>
  );
}