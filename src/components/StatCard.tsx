import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {

  // === COLOR MAPPING ===
  const colorStyles = {
    blue: 'border-l-blue-500 bg-blue-50',
    green: 'border-l-green-500 bg-green-50',
    purple: 'border-l-purple-500 bg-purple-50',
    orange: 'border-l-orange-500 bg-orange-50',
  };

  const iconBgStyles = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
  };

  const iconColorStyles = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  return (
    <div
      className={`border-l-4 ${colorStyles[color]} rounded-lg p-6 shadow-sm hover-lift hover:shadow-md transition-shadow`}
    >
      {/* === HEADER: Title with Icon === */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-10 h-10 ${iconBgStyles[color]} rounded-lg flex items-center justify-center`}>
          <div className={iconColorStyles[color]}>{icon}</div>
        </div>
      </div>

      {/* === MAIN VALUE === */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}