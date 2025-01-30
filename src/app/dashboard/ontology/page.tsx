'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallDriver, Scenario, AccountType, Department, Lifecycle, LifecycleStage } from '@/types/ontology';
import { themeClasses } from '@/lib/theme';
import { mockAccountTypes, departments, lifecycles } from '@/lib/mockData';
import { CallDriversTab } from './components/CallDriversTab';
import { ScenariosTab } from './components/ScenariosTab';
import { AccountTypesTab } from './components/AccountTypesTab';
import { DepartmentsTab } from './components/DepartmentsTab';
import { LifecyclesTab } from './components/LifecyclesTab';

interface EmployeePersona {
  persona_id: number;
  name: string;
}

interface CustomerPersona {
  family_name: string;
  sub_personas: {
    sub_persona_name: string;
    sub_persona_coverage: number;
    description: string;
    notes: string[];
    default_attributes: any;
  }[];
}

export default function OntologyManagerPage() {
  const [activeTab, setActiveTab] = useState<'callDrivers' | 'scenarios' | 'accountTypes' | 'departments' | 'lifecycles'>('callDrivers');
  const [callDrivers, setCallDrivers] = useState<CallDriver[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>(mockAccountTypes);
  const [departmentList, setDepartmentList] = useState<Department[]>(departments);
  const [lifecycleList, setLifecycleList] = useState<Lifecycle[]>(lifecycles);
  const [lifecycleStages, setLifecycleStages] = useState<LifecycleStage[]>([]);
  const [employeePersonas, setEmployeePersonas] = useState<{employee_personas: EmployeePersona[]}>({ employee_personas: [] });
  const [customerPersonas, setCustomerPersonas] = useState<CustomerPersona[]>([]);

  useEffect(() => {
    const loadPersonas = async () => {
      const personas = await import('./employee_personas.json');
      setEmployeePersonas(personas);
    };
    loadPersonas();
  }, []);

  useEffect(() => {
    const loadCustomerPersonas = async () => {
      const personas = await import('./customer_personas.json');
      setCustomerPersonas(personas.default);
    };
    loadCustomerPersonas();
  }, []);

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
            <CallDriversTab 
              callDrivers={callDrivers}
              setCallDrivers={setCallDrivers}
              employeePersonas={employeePersonas}
              departmentList={departmentList}
              accountTypes={accountTypes}
              lifecycleStages={lifecycleStages}
              customerPersonas={customerPersonas}
            />
          </TabsContent>

          <TabsContent value="scenarios">
            <ScenariosTab 
              scenarios={scenarios}
              setScenarios={setScenarios}
              employeePersonas={employeePersonas}
              departmentList={departmentList}
              accountTypes={accountTypes}
              lifecycleStages={lifecycleStages}
              customerPersonas={customerPersonas}
            />
          </TabsContent>

          <TabsContent value="accountTypes">
            <AccountTypesTab 
              accountTypes={accountTypes}
              setAccountTypes={setAccountTypes}
            />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentsTab 
              departmentList={departmentList}
              setDepartmentList={setDepartmentList}
            />
          </TabsContent>

          <TabsContent value="lifecycles">
            <LifecyclesTab 
              accountTypes={accountTypes}
              lifecycleStages={lifecycleStages}
              setLifecycleStages={setLifecycleStages}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 