import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: string;
  storageKey?: string;
  onUpdate?: (newValue: number) => void;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  storageKey,
  onUpdate,
}: StatCardProps) {
  // === STATE FOR LOCALLY STORED VALUE ===
  const [displayValue, setDisplayValue] = useState<string | number>(value);

  // === LIFECYCLE HOOK: Load value from localStorage on mount ===
  useEffect(() => {
    if (storageKey) {
      const savedValue = localStorage.getItem(storageKey);
      if (savedValue) {
        try {
          const parsedValue = JSON.parse(savedValue);
          setDisplayValue(parsedValue);
        } catch (e) {
          console.error(`Failed to load ${storageKey} from localStorage`, e);
        }
      }
    }
  }, [storageKey]);

  // === LIFECYCLE HOOK: Save value to localStorage when it changes ===
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(displayValue));
    }
  }, [displayValue, storageKey]);

  // === EVENT HANDLER: Update stat value ===
  const handleUpdate = (newValue: number) => {
    setDisplayValue(newValue);
    if (onUpdate) {
      onUpdate(newValue);
    }
  };

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
      className={`border-l-4 ${colorStyles[color]} rounded-lg p-6 shadow-sm hover-lift hover:shadow-md transition-shadow cursor-pointer`}
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
        <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
      </div>

      {/* === CONDITIONAL RENDERING: Trend or description === */}
      {trend && (
        <p className={`text-xs font-medium ${trend.includes('+') ? 'text-green-600' : 'text-gray-600'}`}>
          {trend}
        </p>
      )}

      {/* === INTERACTIVE: Test button to update value === */}
      {storageKey && (
        <button
          onClick={() => handleUpdate(typeof displayValue === 'number' ? displayValue + 1 : 0)}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-2 rounded transition-colors"
        >
          Increase (Demo for localStorage)
        </button>
      )}
    </div>
  );
}