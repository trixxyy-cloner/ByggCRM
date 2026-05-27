import { useState } from "react";
import { Search, User, LogOut, Settings } from 'lucide-react';
import NotificationBell from './NotificationBell';

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

interface HeaderProps {
    onSearch: (query: string) => void;
    onLogout?: () => void;
    userName?: string;
    userEmail?: string;
    notifications?: Notification[];
    onClearNotifications?: () => void;
    onDismissNotification?: (id: string) => void;
}

export default function Header({ onSearch, onLogout, userName, userEmail, notifications = [], onClearNotifications, onDismissNotification }: HeaderProps) {
    // === STATE MANAGEMENT ===
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // === EVENT HANDLER: Search input ===
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    // === EVENT HANDLER: Profile menu toggle ===
    const handleProfileClick = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    // === EVENT HANDLER: Logout ===
    const handleLogout = () => {
        setShowProfileMenu(false);
        onLogout?.();
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
                        {/* === NOTIFICATIONS === */}
                        <NotificationBell 
                            notifications={notifications}
                            onClear={onClearNotifications}
                            onDismiss={onDismissNotification}
                        />

                        {/* USER PROFILE DROPDOWN */}
                        <div className="relative">
                            <button 
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white"/>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{userName}</span>
                            </button>

                            {/* === PROFILE DROPDOWN MENU === */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {/* Header with user info */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                                        <p className="text-xs text-gray-600 truncate">{userEmail}</p>
                                    </div>

                                    {/* Menu items */}
                                    <div className="py-2">
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Min profil
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <Settings className="w-4 h-4" />
                                            Inställningar
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-200"></div>

                                    {/* Logout button */}
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logga ut
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}