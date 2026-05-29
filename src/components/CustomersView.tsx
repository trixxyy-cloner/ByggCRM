import { Plus } from 'lucide-react';
import { useState } from 'react';
import CustomerCard from './CustomerCard';
import { CustomerDto } from '../services/customerService';
import Modal from './Modal';
import FormInput from './FormInput';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import FormButtonGroup from './FormButtonGroup';

interface CustomersViewProps {
  customers: CustomerDto[];
  onCustomersUpdate: (customers: CustomerDto[]) => void;
  onCreateCustomer: (customer: CustomerDto) => Promise<void>;
  onUpdateCustomer: (id: string, customer: CustomerDto) => Promise<void>;
  onDeleteCustomer: (id: string) => Promise<void>;
}

export default function CustomersView({ customers, onCustomersUpdate, onCreateCustomer, onUpdateCustomer, onDeleteCustomer }: CustomersViewProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    totalSpent: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalSpent' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert('Vänligen fyll i namn, företag och e-post');
      return;
    }

    setIsLoading(true);
    try {
      const newCustomer: CustomerDto = {
        id: String(Date.now()),
        ...formData,
        projects: 0,
        joinDate: new Date().toISOString(),
      };

      await onCreateCustomer(newCustomer);
      onCustomersUpdate([...customers, newCustomer]);
      setFormData({ name: '', company: '', email: '', phone: '', address: '', totalSpent: 0 });
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
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
          onClick={() => setShowModal(true)}
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
        <EmptyState
          title="No customers yet"
          description="Add your first customer to get started"
          buttonText="Add First Customer"
          onButtonClick={() => setShowModal(true)}
        />
      )}

      {/* === MODAL: Create Customer === */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Lägg till ny kund">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* === LOADING SPINNER === */}
          {isLoading && <LoadingSpinner text="Sparar kund..." />}
          
          <FormInput
            label="Namn"
            type="text"
            name="name"
            placeholder="Namn"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Företag"
            type="text"
            name="company"
            placeholder="Företag"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="E-post"
            type="email"
            name="email"
            placeholder="E-post"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormInput
            label="Telefon"
            type="tel"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <FormInput
            label="Adress"
            type="text"
            name="address"
            placeholder="Adress"
            value={formData.address}
            onChange={handleInputChange}
          />

          <FormButtonGroup
            onCancel={() => setShowModal(false)}
            submitText="Lägg till"
            cancelText="Avbryt"
            isLoading={isLoading}
          />
        </form>
      </Modal>
    </div>
  );
}