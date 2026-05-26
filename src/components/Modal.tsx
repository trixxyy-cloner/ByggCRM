import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 *  Modal komponent - Återanvändbar popup-komponent
 * 
 * En flexibel modal-komponent för att visa innehåll i ett popup-fönster.
 * 
 * FEATURES:
 * - Blockerar bakgrunden med overlay
 * - Strängs med X-knapp, ESC-tangent eller genom onClose callback
 * - Fullständigt responsive
 *  */

interface ModalProps {
    /** Kontrollerar om modal är synlig */
    isOpen: boolean;

    /** Callback när modal ska stängas */
    onClose: () => void;

    /** Rubrik som visas överst i modal */
    title: string;

    /** Innehållet som ska visas inuti modal */
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    // Stäng modal när ESC-tangenten trycks
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Om modal inte är öppen, rendera ingenting
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            {/* Modal container */}
            <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6'>
                    <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-600 transition'
                        aria-label='Stäng modal'
                    >
                        <X className='w-5 h-5'/>
                    </button>
                </div>

                {/* Content */}
                <div className='text-gray-700'>
                    {children}
                </div>
            </div>
        </div>
    );
}