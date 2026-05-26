import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/** ErrorBoundry komponent som fångar React-fel från child-komponenter och visar felmeddelande
 * istället för att krascha hela appen.
 */

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Denna metod körs när ett fel inträffar i en child-komponent
    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    // Denna metod körs EFTER ett fel - bra för loggning
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='flex items-center justify-center min-h-screen bg-red-50'>
                    <div className='bg-white p-8 rounded-lg shadow-lg max-w-md'>
                        <h1 className='text-2xl font-bold text-red-600 mb-6'>Oops! Något gick fel</h1>
                        <p className='text-gray-600 mb-6'>
                            Vi stötte på ett oväntat fel. Försök att uppdatera sidan.
                        </p>
                        <details className='text-sm text-gray-500 mb-6'>
                            <summary className='cursor-pointer font-semibold'>Felinformation (dev)</summary>
                            <pre className='mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs'>
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                        >
                            Uppdatera sidan
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}