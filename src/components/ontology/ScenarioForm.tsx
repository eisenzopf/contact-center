import { useState } from 'react';
import { Scenario } from '@/types/ontology';
import { MultiSelect } from './MultiSelect';
import { AttributeList } from './AttributeList';
import { Save, X } from 'lucide-react';

type ScenarioFormProps = {
  scenario?: Scenario;
  onSave: (scenario: Scenario) => void;
  onCancel: () => void;
  accountTypes: any[];
  accounts: any[];
  customers: any[];
  employees: any[];
  callDrivers: any[];
}

export function ScenarioForm({ 
  scenario, 
  onSave, 
  onCancel,
  accountTypes,
  accounts,
  customers,
  employees,
  callDrivers
}: ScenarioFormProps) {
  const [formData, setFormData] = useState<Scenario>(scenario || {
    id: `sc_${Date.now()}`,
    name: '',
    outline: '',
    duration: '',
    accountTypes: [],
    accounts: [],
    customers: [],
    employees: [],
    departments: [],
    lifecycles: [],
    transactionTypes: [],
    callDrivers: [],
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
          Outline
        </label>
        <textarea
          value={formData.outline}
          onChange={(e) => setFormData({ ...formData, outline: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration
        </label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          placeholder="e.g., 5 minutes"
          required
        />
      </div>

      <MultiSelect
        options={callDrivers}
        selectedIds={formData.callDrivers.map(cd => cd.id)}
        onChange={(ids) => setFormData({
          ...formData,
          callDrivers: callDrivers.filter(cd => ids.includes(cd.id))
        })}
        label="Call Drivers"
      />

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