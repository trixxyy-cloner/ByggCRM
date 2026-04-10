import { useState } from 'react';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
  onClick?: () => void;
}

export default function CustomerCard({ customer, onClick }: CustomerCardProps) {
  // === STATE: Track if contact info is visible ===
  const [showContact, setShowContact] = useState(false);

  // === EVENT HANDLER: Toggle contact visibility ===
  const handleToggleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContact(!showContact);
  };

  // === EVENT HANDLER: Card click ===
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // === DATE FORMATTING ===
  const joinDate = new Date(customer.joinDate).toLocaleDateString('sv-SE');

  return (
    <div
      onClick={handleCardClick}
      className="border-t-4 border-t-blue-500 rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      {/* === HEADER: Customer Name with Badge === */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <Briefcase className="w-4 h-4" />
            {customer.company}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {customer.projects} project{customer.projects !== 1 ? 's' : ''}
        </span>
      </div>

      {/* === ADDRESS SECTION === */}
      <div className="mb-4">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{customer.address}</p>
        </div>
      </div>

      {/* === SPENDING INFO === */}
      <div className="mb-4">
        <p className="text-xs text-gray-600">Total Spent</p>
        <p className="text-2xl font-bold text-gray-900">{customer.totalSpent.toLocaleString()} kr</p>
      </div>

      {/* === TOGGLE BUTTON: Show/Hide Contact Info === */}
      <button
        onClick={handleToggleContact}
        className="w-full mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
      >
        {showContact ? 'Hide Contact Info' : 'Show Contact Info'}
      </button>

      {/* === CONDITIONAL RENDERING: Contact Information === */}
      {showContact && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href={`mailto:${customer.email}`} className="text-sm text-blue-600 hover:underline">
              {customer.email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <a href={`tel:${customer.phone}`} className="text-sm text-blue-600 hover:underline">
              {customer.phone}
            </a>
          </div>

          {/* Join Date */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Customer since</span>
            <span>{joinDate}</span>
          </div>
        </div>
      )}
    </div>
  );
}