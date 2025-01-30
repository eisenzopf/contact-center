import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Scenario, Department, AccountType, LifecycleStage } from '@/types/ontology';
import { ScenarioForm } from '@/components/ontology/ScenarioForm';

interface ScenariosTabProps {
  scenarios: Scenario[];
  setScenarios: (scenarios: Scenario[]) => void;
  employeePersonas: any;
  departmentList: Department[];
  accountTypes: AccountType[];
  lifecycleStages: LifecycleStage[];
  customerPersonas: any[];
}

export function ScenariosTab({
  scenarios,
  setScenarios,
  employeePersonas,
  departmentList,
  accountTypes,
  lifecycleStages,
  customerPersonas
}: ScenariosTabProps) {
  const [editingItem, setEditingItem] = useState<Scenario | null>(null);
  const [showScenarioForm, setShowScenarioForm] = useState(false);

  const handleSaveScenario = (scenario: Scenario) => {
    if (editingItem) {
      setScenarios(scenarios.map(s => 
        s.id === scenario.id ? scenario : s
      ));
    } else {
      setScenarios([...scenarios, scenario]);
    }
    setEditingItem(null);
    setShowScenarioForm(false);
  };

  const personaOptions = employeePersonas.employee_personas.map(persona => ({
    value: persona.persona_id.toString(),
    label: `${persona.persona_id} - ${persona.name}`
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Scenarios</CardTitle>
        <button 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
          onClick={() => {
            setEditingItem(null);
            setShowScenarioForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Scenario
        </button>
      </CardHeader>
      <CardContent>
        {showScenarioForm && (
          <ScenarioForm
            scenario={editingItem}
            onSave={handleSaveScenario}
            onCancel={() => {
              setShowScenarioForm(false);
              setEditingItem(null);
            }}
            departmentOptions={departmentList.map(dept => ({
              id: dept.id,
              name: dept.name
            }))}
            accountTypeOptions={accountTypes.map(type => ({
              id: type.id,
              name: type.name,
              order: type.order
            }))}
            personaOptions={personaOptions}
            customerPersonas={customerPersonas}
            lifecycleStages={lifecycleStages}
          />
        )}
        
        {!showScenarioForm && (
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{scenario.name}</h3>
                  <p className="text-sm text-gray-500">{scenario.outline}</p>
                  <p className="text-sm text-gray-400">Duration: {scenario.duration}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(scenario);
                      setShowScenarioForm(true);
                    }}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setScenarios(scenarios.filter(s => s.id !== scenario.id))}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 