import { Plus } from 'lucide-react';
import PropTypes from 'prop-types';

interface EmptyStateProps {
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
    icon?: React.ReactNode;
}

/**
 * Reusable Empty State Component
 * Displays when there are no items to show (projects, customers, etc)
 * 
 * @component
 * @example
 * <EmptyState
 *   title="No projects found"
 *   description="Try adjusting your filters or add a new project"
 *   buttonText="Create First Project"
 *   onButtonClick={() => setShowModal(true)}
 * />
 */
export default function EmptyState({
    title,
    description,
    buttonText,
    onButtonClick,
    icon = <Plus className="w-6 h-6 text-gray-400" />
}: EmptyStateProps) {
return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <button
        onClick={onButtonClick}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};