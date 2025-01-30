import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { AccountType, LifecycleStage } from '@/types/ontology';

interface LifecyclesTabProps {
  accountTypes: AccountType[];
  lifecycleStages: LifecycleStage[];
  setLifecycleStages: (stages: LifecycleStage[]) => void;
}

export function LifecyclesTab({
  accountTypes,
  lifecycleStages,
  setLifecycleStages
}: LifecyclesTabProps) {
  const [editingItem, setEditingItem] = useState<LifecycleStage | null>(null);

  const reorderLifecycle = (accountTypeId: string, stageId: string, direction: 'up' | 'down') => {
    const stages = lifecycleStages.filter(s => s.accountTypeId === accountTypeId);
    const stageIndex = stages.findIndex(s => s.id === stageId);
    
    if (direction === 'up' && stageIndex > 0) {
      const newStages = [...lifecycleStages];
      const stageToMove = newStages.find(s => s.id === stageId)!;
      const stageToSwap = stages[stageIndex - 1];
      
      const tempOrder = stageToMove.order;
      stageToMove.order = stageToSwap.order;
      stageToSwap.order = tempOrder;
      
      setLifecycleStages(newStages);
    }
    // Add down direction logic if needed
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lifecycle Stages by Account Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {accountTypes.map((accountType) => (
            <div key={accountType.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{accountType.name}</h3>
                <button 
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1.5 rounded-lg flex items-center hover:bg-[var(--primary-hover)] text-sm"
                  onClick={() => {
                    const newStage: LifecycleStage = {
                      id: `ls_${Date.now()}`,
                      name: 'New Stage',
                      order: lifecycleStages.filter(s => s.accountTypeId === accountType.id).length,
                      accountTypeId: accountType.id
                    };
                    setLifecycleStages([...lifecycleStages, newStage]);
                    setEditingItem(newStage);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Stage
                </button>
              </div>
              
              <div className="space-y-2">
                {lifecycleStages
                  .filter(stage => stage.accountTypeId === accountType.id)
                  .sort((a, b) => a.order - b.order)
                  .map((stage, index, filteredStages) => (
                    <div key={stage.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                      {editingItem?.id === stage.id ? (
                        <div className="flex-1 mr-4">
                          <input
                            type="text"
                            value={stage.name}
                            onChange={(e) => {
                              setLifecycleStages(stages => 
                                stages.map(s => 
                                  s.id === stage.id ? {...s, name: e.target.value} : s
                                )
                              );
                            }}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter stage name..."
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="font-medium">{stage.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => reorderLifecycle(accountType.id, stage.id, 'up')}
                                disabled={index === 0}
                                className="p-1 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => reorderLifecycle(accountType.id, stage.id, 'down')}
                                disabled={index === filteredStages.length - 1}
                                className="p-1 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-30"
                              >
                                ↓
                              </button>
                            </div>
                            <button
                              onClick={() => setEditingItem(stage)}
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setLifecycleStages(stages => stages.filter(s => s.id !== stage.id))}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 