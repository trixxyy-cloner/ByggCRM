import { useState } from 'react';
import { ChevronDown, MapPin, Users, } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // === STATE: Track if card is expanded ===
  const [isExpanded, setIsExpanded] = useState(false);

  // === EVENT HANDLER: Toggle expand ===
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // === EVENT HANDLER: Card click ===
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // === STATUS COLOR MAPPING ===
  const statusColorMap = {
    planning: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  // === PROGRESS BAR COLOR ===
  const progressColor = {
    planning: 'bg-yellow-500',
    ongoing: 'bg-blue-500',
    completed: 'bg-green-500',
  };

  return (
    <div
      onClick={handleCardClick}
      className={`border-l-4 border-l-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${
        // === CONDITIONAL STYLING: Active/Expanded state ===
        isExpanded ? 'ring-2 ring-blue-300 bg-blue-50' : 'bg-white'
      }`}
    >
      {/* === HEADER: Title with Expand Button === */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.client}</p>
        </div>
        <button
          onClick={handleExpandClick}
          className={`p-2 hover:bg-gray-100 rounded-lg transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* === STATUS BADGE === */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColorMap[project.status]}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      {/* === PROGRESS BAR === */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs font-semibold text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${progressColor[project.status]}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* === MAIN INFO (Always visible) === */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{project.address}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{project.team.length} members</span>
        </div>
      </div>

      {/* === CONDITIONAL RENDERING: Expanded Details === */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          {/* Budget */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Budget</span>
            <span className="text-sm font-semibold text-gray-900">{project.budget.toLocaleString()} kr</span>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Timeline</span>
            <span className="text-sm font-semibold text-gray-900">
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>

          {/* Team Members */}
          <div>
            <span className="text-sm text-gray-600">Team</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.team.map((member, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}