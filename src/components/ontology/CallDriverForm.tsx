import { useState, useMemo } from 'react';
import { CallDriver } from '@/types/ontology';
import { MultiSelect } from './MultiSelect';
import { AttributeList } from './AttributeList';
import { Save, X } from 'lucide-react';

type CallDriverFormProps = {
  callDriver?: CallDriver;
  onSave: (callDriver: CallDriver) => void;
  onCancel: () => void;
  personaOptions: { value: string; label: string; }[];
  departmentOptions: Department[];
  accountTypeOptions: AccountType[];
  transactionTypeOptions: TransactionType[];
}

export function CallDriverForm({ 
  callDriver, 
  onSave, 
  onCancel,
  personaOptions,
  departmentOptions,
  accountTypeOptions,
  transactionTypeOptions
}: CallDriverFormProps) {
  const [formData, setFormData] = useState({
    id: callDriver?.id || `cd_${Date.now()}`,
    name: callDriver?.name || '',
    description: callDriver?.description || '',
    accountTypes: callDriver?.accountTypes || [],
    accounts: callDriver?.accounts || [],
    customers: callDriver?.customers || [],
    employees: callDriver?.employees || [],
    departments: callDriver?.departments || [],
    lifecycles: callDriver?.lifecycles || [],
    transactionTypes: callDriver?.transactionTypes || [],
    attributes: callDriver?.attributes || [],
    selectedPersonas: callDriver?.selectedPersonas || []
  });

  // Group lifecycle stages by account type
  const lifecyclesByAccountType = useMemo(() => {
    const grouped = new Map<string, any[]>();
    accountTypeOptions.forEach(at => {
      const stages = grouped.get(at.id) || [];
      stages.push(at);
      grouped.set(at.id, stages.sort((a, b) => a.order - b.order));
    });
    return grouped;
  }, [accountTypeOptions]);

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

      <div>
        <label className="block text-sm font-medium mb-1">
          Departments
        </label>
        <div className="space-y-2">
          {departmentOptions.map((dept) => (
            <label key={dept.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.departments.includes(dept.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({
                      ...formData,
                      departments: [...formData.departments, dept.name]
                    });
                  } else {
                    setFormData({
                      ...formData,
                      departments: formData.departments.filter(d => d !== dept.name)
                    });
                  }
                }}
                className="rounded border-gray-300"
              />
              <span>{dept.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Account Types and Lifecycles
        </label>
        <div className="space-y-4">
          {accountTypeOptions.map((at) => (
            <div key={at.id} className="border rounded-lg p-3">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={formData.accountTypes.some(t => t.id === at.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        accountTypes: [...formData.accountTypes, at]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        accountTypes: formData.accountTypes.filter(t => t.id !== at.id),
                        lifecycles: formData.lifecycles.filter(l => 
                          !lifecyclesByAccountType.get(at.id)?.some(stage => stage.id === l)
                        )
                      });
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span className="font-medium">{at.name}</span>
              </label>

              {formData.accountTypes.some(t => t.id === at.id) && (
                <div className="ml-6 space-y-2">
                  {(lifecyclesByAccountType.get(at.id) || []).map((stage) => (
                    <label key={stage.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.lifecycles.includes(stage.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              lifecycles: [...formData.lifecycles, stage.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              lifecycles: formData.lifecycles.filter(l => l !== stage.id)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span>{stage.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <MultiSelect
          options={personaOptions.map(p => ({ id: p.value, name: p.label }))}
          selectedIds={formData.selectedPersonas}
          onChange={(selected) => {
            setFormData({
              ...formData,
              selectedPersonas: selected
            });
          }}
          label="Employee Personas"
        />
      </div>

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