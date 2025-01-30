import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CallDriver, Department, AccountType, LifecycleStage } from '@/types/ontology';
import { CallDriverForm } from '@/components/ontology/CallDriverForm';

interface CallDriversTabProps {
  callDrivers: CallDriver[];
  setCallDrivers: (callDrivers: CallDriver[]) => void;
  employeePersonas: any;
  departmentList: Department[];
  accountTypes: AccountType[];
  lifecycleStages: LifecycleStage[];
  customerPersonas: any[];
}

export function CallDriversTab({
  callDrivers,
  setCallDrivers,
  employeePersonas,
  departmentList,
  accountTypes,
  lifecycleStages,
  customerPersonas
}: CallDriversTabProps) {
  const [editingItem, setEditingItem] = useState<CallDriver | null>(null);
  const [showCallDriverForm, setShowCallDriverForm] = useState(false);

  const handleSaveCallDriver = (callDriver: CallDriver) => {
    if (editingItem) {
      setCallDrivers(callDrivers.map(cd => 
        cd.id === callDriver.id ? callDriver : cd
      ));
    } else {
      setCallDrivers([...callDrivers, callDriver]);
    }
    setEditingItem(null);
    setShowCallDriverForm(false);
  };

  const handleDelete = (callDriver: CallDriver) => {
    setCallDrivers(callDrivers.filter(cd => cd.id !== callDriver.id));
  };

  const personaOptions = employeePersonas.employee_personas.map(persona => ({
    value: persona.persona_id.toString(),
    label: `${persona.persona_id} - ${persona.name}`
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Call Drivers</CardTitle>
        <button 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
          onClick={() => {
            setEditingItem(null);
            setShowCallDriverForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Call Driver
        </button>
      </CardHeader>
      <CardContent>
        {showCallDriverForm && (
          <CallDriverForm
            callDriver={editingItem}
            onSave={handleSaveCallDriver}
            onCancel={() => {
              setShowCallDriverForm(false);
              setEditingItem(null);
            }}
            personaOptions={personaOptions}
            departmentOptions={departmentList}
            accountTypeOptions={accountTypes}
            customerPersonas={customerPersonas}
            lifecycleStages={lifecycleStages}
          />
        )}
        
        {!showCallDriverForm && (
          <div className="space-y-4">
            {callDrivers.map((callDriver) => (
              <div key={callDriver.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{callDriver.name}</h3>
                  <p className="text-sm text-gray-500">{callDriver.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(callDriver);
                      setShowCallDriverForm(true);
                    }}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(callDriver)}
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