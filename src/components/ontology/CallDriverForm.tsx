import { useState, useMemo } from 'react';
import { CallDriver, LifecycleStage } from '@/types/ontology';
import { MultiSelect } from './MultiSelect';
import { AttributeList } from './AttributeList';
import { Save, X } from 'lucide-react';

interface CustomerFamily {
  familyName: string;
  subPersonas: string[];
}

type CallDriverFormProps = {
  callDriver?: CallDriver;
  onSave: (callDriver: CallDriver) => void;
  onCancel: () => void;
  personaOptions: { value: string; label: string; }[];
  departmentOptions: Array<{ id: string; name: string; }>;
  accountTypeOptions: Array<{ id: string; name: string; order: number; }>;
  transactionTypeOptions: Array<{ id: string; name: string; }>;
  customerPersonas: Array<{
    family_name: string;
    sub_personas: {
      sub_persona_name: string;
      sub_persona_coverage: number;
      description: string;
      notes: string[];
      default_attributes: any;
    }[];
  }>;
  lifecycleStages: LifecycleStage[];
}

export function CallDriverForm({ 
  callDriver, 
  onSave, 
  onCancel,
  personaOptions,
  departmentOptions,
  accountTypeOptions,
  transactionTypeOptions,
  customerPersonas,
  lifecycleStages
}: CallDriverFormProps) {
  const [formData, setFormData] = useState({
    id: callDriver?.id || `cd_${Date.now()}`,
    name: callDriver?.name || '',
    description: callDriver?.description || '',
    chanceOfCallPerMonth: callDriver?.chanceOfCallPerMonth || '',
    accountTypes: callDriver?.accountTypes || [],
    accounts: callDriver?.accounts || [],
    customers: callDriver?.customers || [],
    employees: callDriver?.employees || [],
    departments: callDriver?.departments || [],
    lifecycles: callDriver?.lifecycles || [],
    transactionTypes: callDriver?.transactionTypes || [],
    attributes: callDriver?.attributes || [],
    selectedPersonas: callDriver?.selectedPersonas || [],
    customerFamilies: callDriver?.customerFamilies || []
  });

  // Group lifecycle stages by account type
  const lifecyclesByAccountType = useMemo(() => {
    const grouped = new Map<string, LifecycleStage[]>();
    lifecycleStages.forEach(stage => {
      const stages = grouped.get(stage.accountTypeId) || [];
      stages.push(stage);
      grouped.set(stage.accountTypeId, stages.sort((a, b) => a.order - b.order));
    });
    return grouped;
  }, [lifecycleStages]);

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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          % Chance of Call per Month
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={formData.chanceOfCallPerMonth}
          onChange={(e) => setFormData({ ...formData, chanceOfCallPerMonth: e.target.value })}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter percentage (0-100)"
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

      <div>
        <label className="block text-sm font-medium mb-1">
          Customer Personas
        </label>
        <div className="space-y-4">
          {customerPersonas.map((family) => (
            <div key={family.family_name} className="border rounded-lg p-3">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={formData.customerFamilies.some(f => f.familyName === family.family_name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        customerFamilies: [...formData.customerFamilies, {
                          familyName: family.family_name,
                          subPersonas: []
                        }]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        customerFamilies: formData.customerFamilies.filter(f => 
                          f.familyName !== family.family_name
                        )
                      });
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span className="font-medium">{family.family_name}</span>
              </label>

              {formData.customerFamilies.some(f => f.familyName === family.family_name) && (
                <div className="ml-6 space-y-2">
                  {family.sub_personas.map((subPersona) => (
                    <label key={subPersona.sub_persona_name} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.customerFamilies
                          .find(f => f.familyName === family.family_name)
                          ?.subPersonas.includes(subPersona.sub_persona_name)}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            customerFamilies: formData.customerFamilies.map(f => {
                              if (f.familyName === family.family_name) {
                                return {
                                  ...f,
                                  subPersonas: e.target.checked
                                    ? [...f.subPersonas, subPersona.sub_persona_name]
                                    : f.subPersonas.filter(sp => sp !== subPersona.sub_persona_name)
                                };
                              }
                              return f;
                            })
                          });
                        }}
                        className="rounded border-gray-300"
                      />
                      <span>{subPersona.sub_persona_name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
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