'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { CallDriver, Scenario, Attribute, AccountType, Department, Lifecycle, LifecycleStage } from '@/types/ontology';
import { themeClasses } from '@/lib/theme';
import { CallDriverForm } from '@/components/ontology/CallDriverForm';
import { ScenarioForm } from '@/components/ontology/ScenarioForm';
import { 
  mockAccountTypes, 
  mockAccounts, 
  mockCustomers, 
  mockEmployees,
  departments,
  lifecycles,
  transactionTypes
} from '@/lib/mockData';

interface EmployeePersona {
  persona_id: number;
  name: string;
  // ... other fields not needed for this use case
}

export default function OntologyManagerPage() {
  const [activeTab, setActiveTab] = useState<'callDrivers' | 'scenarios' | 'accountTypes' | 'departments' | 'lifecycles'>('callDrivers');
  const [callDrivers, setCallDrivers] = useState<CallDriver[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [editingItem, setEditingItem] = useState<CallDriver | Scenario | AccountType | Department | Lifecycle | LifecycleStage | null>(null);
  const [showCallDriverForm, setShowCallDriverForm] = useState(false);
  const [showScenarioForm, setShowScenarioForm] = useState(false);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>(mockAccountTypes);
  const [departmentList, setDepartmentList] = useState<Department[]>(departments);
  const [lifecycleList, setLifecycleList] = useState<Lifecycle[]>(lifecycles);
  const [lifecycleStages, setLifecycleStages] = useState<LifecycleStage[]>([]);
  const [employeePersonas, setEmployeePersonas] = useState<{employee_personas: EmployeePersona[]}>({ employee_personas: [] });

  useEffect(() => {
    const loadPersonas = async () => {
      const personas = await import('./employee_personas.json');
      setEmployeePersonas(personas);
    };
    loadPersonas();
  }, []);

  const personaOptions = employeePersonas.employee_personas.map(persona => ({
    value: persona.persona_id.toString(),
    label: `${persona.persona_id} - ${persona.name}`
  }));

  const handleAddAttribute = (item: CallDriver | Scenario) => {
    const newAttribute: Attribute = {
      id: `attr_${Date.now()}`,
      name: '',
      value: ''
    };
    
    if ('outline' in item) { // Scenario
      setScenarios(scenarios.map(s => 
        s.id === item.id ? {...s, attributes: [...s.attributes, newAttribute]} : s
      ));
    } else { // CallDriver
      setCallDrivers(callDrivers.map(cd => 
        cd.id === item.id ? {...cd, attributes: [...cd.attributes, newAttribute]} : cd
      ));
    }
  };

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

  const handleDelete = (item: CallDriver | Scenario) => {
    if ('outline' in item) {
      setScenarios(scenarios.filter(s => s.id !== item.id));
    } else {
      setCallDrivers(callDrivers.filter(cd => cd.id !== item.id));
    }
  };

  const reorderLifecycle = (accountTypeId: string, stageId: string, direction: 'up' | 'down') => {
    setLifecycleStages(prevStages => {
      const stages = [...prevStages];
      const accountTypeStages = stages.filter(s => s.accountTypeId === accountTypeId);
      const currentIndex = accountTypeStages.findIndex(s => s.id === stageId);
      
      if (direction === 'up' && currentIndex > 0) {
        const temp = accountTypeStages[currentIndex].order;
        accountTypeStages[currentIndex].order = accountTypeStages[currentIndex - 1].order;
        accountTypeStages[currentIndex - 1].order = temp;
      } else if (direction === 'down' && currentIndex < accountTypeStages.length - 1) {
        const temp = accountTypeStages[currentIndex].order;
        accountTypeStages[currentIndex].order = accountTypeStages[currentIndex + 1].order;
        accountTypeStages[currentIndex + 1].order = temp;
      }
      
      return stages.map(s => {
        const updatedStage = accountTypeStages.find(as => as.id === s.id);
        return updatedStage || s;
      });
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-screen-xl mx-auto p-6">
        <h1 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
          Ontology Manager
        </h1>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="callDrivers">Call Drivers</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="accountTypes">Account Types</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="lifecycles">Lifecycles</TabsTrigger>
          </TabsList>

          <TabsContent value="callDrivers">
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
                    callDriver={editingItem as CallDriver}
                    onSave={handleSaveCallDriver}
                    onCancel={() => {
                      setShowCallDriverForm(false);
                      setEditingItem(null);
                    }}
                    accountTypes={accountTypes}
                    accounts={mockAccounts}
                    customers={mockCustomers}
                    employees={mockEmployees}
                    departments={departmentList}
                    lifecycleStages={lifecycleStages}
                    employeePersonas={personaOptions}
                  />
                )}
                
                {!showCallDriverForm && (
                  <div className="space-y-4">
                    {callDrivers.map((cd) => (
                      <div key={cd.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{cd.name}</h3>
                          <p className="text-sm text-gray-500">{cd.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(cd);
                              setShowCallDriverForm(true);
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cd)}
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
          </TabsContent>

          <TabsContent value="scenarios">
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
                    scenario={editingItem as Scenario}
                    onSave={(s) => {
                      handleSaveScenario(s);
                      setShowScenarioForm(false);
                    }}
                    onCancel={() => {
                      setShowScenarioForm(false);
                      setEditingItem(null);
                    }}
                    accountTypes={mockAccountTypes}
                    accounts={mockAccounts}
                    customers={mockCustomers}
                    employees={mockEmployees}
                    callDrivers={callDrivers}
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
                            onClick={() => handleDelete(scenario)}
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
          </TabsContent>

          <TabsContent value="accountTypes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Account Types</CardTitle>
                <button 
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
                  onClick={() => {
                    setEditingItem(null);
                    const newAccountType: AccountType = {
                      id: `at_${Date.now()}`,
                      name: `New Account Type`,
                      eligibility: '',
                      fees: '',
                      interest: '',
                      term: '',
                    };
                    setAccountTypes([...accountTypes, newAccountType]);
                    setEditingItem(newAccountType);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account Type
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountTypes.map((at: AccountType) => (
                    <div key={at.id} className="flex items-center justify-between p-4 border rounded-lg">
                      {editingItem && editingItem.id === at.id ? (
                        <div className="w-full space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={at.name}
                              onChange={(e) => {
                                setAccountTypes(accountTypes.map(item => 
                                  item.id === at.id ? {...item, name: e.target.value} : item
                                ));
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Account Type Name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                            <input
                              type="text"
                              value={at.eligibility || ''}
                              onChange={(e) => {
                                setAccountTypes(accountTypes.map(item => 
                                  item.id === at.id ? {...item, eligibility: e.target.value} : item
                                ));
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter eligibility criteria..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                            <input
                              type="text"
                              value={at.fees || ''}
                              onChange={(e) => {
                                setAccountTypes(accountTypes.map(item => 
                                  item.id === at.id ? {...item, fees: e.target.value} : item
                                ));
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter fees information..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                            <input
                              type="text"
                              value={at.interest || ''}
                              onChange={(e) => {
                                setAccountTypes(accountTypes.map(item => 
                                  item.id === at.id ? {...item, interest: e.target.value} : item
                                ));
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter interest rate information..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                            <input
                              type="text"
                              value={at.term || ''}
                              onChange={(e) => {
                                setAccountTypes(accountTypes.map(item => 
                                  item.id === at.id ? {...item, term: e.target.value} : item
                                ));
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter term information..."
                            />
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h3 className="font-medium">{at.name}</h3>
                            <p className="text-sm text-gray-500">{at.eligibility}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingItem(at)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setAccountTypes(accountTypes.filter(item => item.id !== at.id))}
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Departments</CardTitle>
                <button 
                  className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
                  onClick={() => {
                    const newDepartment = 'New Department' as Department;
                    setDepartmentList([...departmentList, newDepartment]);
                    setEditingItem(newDepartment);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentList.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      {editingItem === dept ? (
                        <div className="w-full space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                            <input
                              type="text"
                              value={dept}
                              onChange={(e) => {
                                const newDepts = [...departmentList];
                                newDepts[index] = e.target.value as Department;
                                setDepartmentList(newDepts);
                              }}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter department name..."
                            />
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h3 className="font-medium">{dept}</h3>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingItem(dept)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDepartmentList(departmentList.filter((_, i) => i !== index))}
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lifecycles">
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
                                      className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => setLifecycleStages(stages => 
                                        stages.filter(s => s.id !== stage.id)
                                      )}
                                      className="p-1.5 text-red-500 hover:bg-red-50 rounded"
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 