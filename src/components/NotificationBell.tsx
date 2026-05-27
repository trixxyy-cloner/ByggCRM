import { useState } from "react";
import { Bell, X } from 'lucide-react';


interface Notification {
    id: string;
    message: string;
    timestamp: Date;
}

interface NotificationBellProps {
    notifications?: Notification[];
    onClear?: () => void;
    onDismiss?: (id: string) => void;
}

const formatTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just nu';
    if (diffMins < 60) return `${diffMins}m sen`;
    if (diffHours < 24) return `${diffHours}h sen`;
    if (diffDays < 7) return `${diffDays}d sen`;
    return date.toLocaleDateString('sv-SE');
};

export default function NotificationBell({
    notifications = [],
    onClear,
    onDismiss,
}: NotificationBellProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            {/* BELL BUTTON */}
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Bell className="w-5 h-5"/>

                {/* BADGE */}
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                )}
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-40 border border-gray-200">
                    {/* HEADER */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Nitofikationer</h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={() => {
                                    onClear?.();
                                    setShowDropdown(false);
                                }}
                                className="text-xs text-blue-600 hover:text-blue-700"
                            >
                                Rensa alla
                            </button>
                        )}
                    </div>

                    {/* NOTIFICATIONS LIST */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {notifications.map((notif) => (
                                    <li
                                        key={notif.id}
                                        className="flex items-start justify-between gap-3 p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatTime(notif.timestamp)}
                                            </p>
                                        </div>
                                        {onDismiss && (
                                            <button
                                                onClick={() => onDismiss(notif.id)}
                                                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <X className="w-4 h-4"/>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            // EMPTY STATE
                            <div className="p-8 text-center">
                                <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2"/>
                                <p className="text-sm text-gray-500">Inga notifikationer</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CLOSE DROPDOWN ON OUTSIDE CLICK */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
}