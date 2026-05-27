import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    containerClassName?: string;
}

export default function FormInput({
    label,
    error,
    helpText,
    containerClassName = '',
    className = '',
    required,
    ...props
}: FormInputProps) {
    const hasError = !!error;

    return (
        <div className={containerClassName}>
            {/* LABEL */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* INPUT */}
            <input
                {...props}
                required={required}
                className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                    hasError
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                } ${className}`}
            />

            {/* ERROR (red) */}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

            {/* HELP TEXT (gray) */}
            {!error && helpText && (
                <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
        </div>
    );
}

