import { Plus } from 'lucide-react';
import CustomerCard from './CustomerCard';
import { CustomerDto } from '../services/customerService';

interface CustomersViewProps {
  customers: CustomerDto[];
  onCustomersUpdate: (customers: CustomerDto[]) => void;
  onCreateCustomer: (customer: CustomerDto) => Promise<void>;
  onUpdateCustomer: (id: string, customer: CustomerDto) => Promise<void>;
  onDeleteCustomer: (id: string) => Promise<void>;
}

export default function CustomersView({ customers, onCustomersUpdate, onCreateCustomer, onUpdateCustomer, onDeleteCustomer }: CustomersViewProps) {
  // === EVENT HANDLER: Add new customer (demo) ===
  const handleAddCustomer = async () => {
    const newCustomer: CustomerDto = {
      id: String(Date.now()),
      name: 'New Customer',
      company: 'Company AB',
      email: 'info@company.se',
      phone: '+46701234567',
      address: 'Street 123, City',
      projects: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0],
    };
    await onCreateCustomer(newCustomer);
    onCustomersUpdate([...customers, newCustomer]);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* === PAGE HEADER === */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Customers</h2>
          <p className="text-gray-600 mt-2">Manage and overview all your customers</p>
        </div>
        <button
          onClick={handleAddCustomer}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* === CUSTOMERS GRID (3 columns) === */}
      {customers.length > 0 ? (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} onUpdateCustomer={onUpdateCustomer} onDeleteCustomer={onDeleteCustomer} />
          ))}
        </div>
      ) : (
        // === CONDITIONAL RENDERING: Empty State ===
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No customers yet</h3>
          <p className="text-gray-600 text-sm mb-6">Add your first customer to get started</p>
          <button
            onClick={handleAddCustomer}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Add First Customer
          </button>
        </div>
      )}
    </div>
  );
}