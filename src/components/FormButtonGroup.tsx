import PropTypes from 'prop-types';

interface FormButtonGroupProps {
    onCancel: () => void;
    submitText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

/**
 * Reusable Form Button Group Component
 * Displays Cancel and Submit buttons with consistent styling
 * 
 * @component
 * @example
 * <FormButtonGroup
 *   onCancel={() => setShowModal(false)}
 *   submitText="Skapa"
 *   cancelText="Avbryt"
 *   isLoading={isLoading}
 * />
 */
export default function FormButtonGroup({
    onCancel,
    submitText = 'Skapa',
    cancelText = 'Avbryt',
    isLoading = false,
}: FormButtonGroupProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitText}
      </button>
    </div>
  );
}

FormButtonGroup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    isLoading: PropTypes.bool,
};

FormButtonGroup.defaultProps = {
    submitText: 'Skapa',
    cancelText: 'Avbryt',
    isLoading: false,
};