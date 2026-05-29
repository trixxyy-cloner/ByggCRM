import PropTypes from 'prop-types';

interface LoadingSpinnerProps {
    text?: string;
    size?: 'sm' | 'md' | 'lg';
    overlay?: boolean;
}

export default function LoadingSpinner({
    text,
    size = 'md',
    overlay = false,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    const spinnerContent = (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* ANIMATED SPINNER */}
            <div className="relative">
                <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin`}/>
            </div>

            {/* TEXT */}
            {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
        </div>
    );

    // Full-screen overlay mode
    if (overlay) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {spinnerContent}
            </div>
        );
    }

    // Inline mode
    return spinnerContent;
}

LoadingSpinner.propTypes = {
    text: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    overlay: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
    size: 'md',
    overlay: false,
};