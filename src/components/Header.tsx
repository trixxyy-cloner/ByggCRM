import { useState } from "react";
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
    onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
    // === STATE MANAGEMENT ===
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    // === EVENT HANDLER: Search input ===
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    // === EVENT HANDLER: Notifications toggle ===
    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 animate-fade-in">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* === LOGO SECTION === */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">ByggCRM</h1>
                    </div>

                    {/* === SEARCH BAR === */}
                    <div className="flex-1 max-w-xs md:max-w-md mx-2 md:mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <input
                                type="text"
                                placeholder="Search projects, customers..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    </div>

                    {/* === RIGHT SECTION: NOTIFICATIONS & PROFILE === */}
                    <div className="flex items-center gap-4">
                        {/* NOTIFICATIONS BUTTON */}
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                            >
                                <Bell className="w-5 h-5"/>
                                {/* Red notification dot */}
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* === CONDITIONAL RENDERING: Notifications dropdown === */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                                            <p className="text-sm font-medium text-gray-900">New project assigned</p>
                                            <p className="text-xs text-gray-600">2 hours ago</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                                            <p className="text-sm font-medium text-gray-900">Customer updated</p>
                                            <p className="text-xs text-gray-600">1 hour ago</p>
                                        </div>
                                        <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
                                            <p className="text-sm font-medium text-gray-900">Deadline approaching</p>
                                            <p className="text-xs text-gray-600">30 minutes ago</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* USER PROFILE */}
                        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white"/>
                            </div>
                            <span className="text-sm font-medium text-gray-900">Admin</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}