import { useState } from 'react';
import { CallDriver } from '@/types/ontology';
import { MultiSelect } from './MultiSelect';
import { AttributeList } from './AttributeList';
import { Save, X } from 'lucide-react';

type CallDriverFormProps = {
  callDriver?: CallDriver;
  onSave: (callDriver: CallDriver) => void;
  onCancel: () => void;
  accountTypes: any[];
  accounts: any[];
  customers: any[];
  employees: any[];
}

export function CallDriverForm({ 
  callDriver, 
  onSave, 
  onCancel,
  accountTypes,
  accounts,
  customers,
  employees
}: CallDriverFormProps) {
  const [formData, setFormData] = useState<CallDriver>(callDriver || {
    id: `cd_${Date.now()}`,
    name: '',
    description: '',
    accountTypes: [],
    accounts: [],
    customers: [],
    employees: [],
    departments: [],
    lifecycles: [],
    transactionTypes: [],
    attributes: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          rows={3}
        />
      </div>

      <MultiSelect
        options={accountTypes}
        selectedIds={formData.accountTypes.map(at => at.id)}
        onChange={(ids) => setFormData({
          ...formData,
          accountTypes: accountTypes.filter(at => ids.includes(at.id))
        })}
        label="Account Types"
      />

      {/* Similar MultiSelect components for other relationships */}

      <AttributeList
        attributes={formData.attributes}
        onChange={(attributes) => setFormData({ ...formData, attributes })}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-2 inline" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Save className="h-4 w-4 mr-2 inline" />
          Save
        </button>
      </div>
    </form>
  );
} 