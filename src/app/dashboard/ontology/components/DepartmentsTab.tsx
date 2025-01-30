import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { Department } from '@/types/ontology';

interface DepartmentsTabProps {
  departmentList: Department[];
  setDepartmentList: (departments: Department[]) => void;
}

export function DepartmentsTab({
  departmentList,
  setDepartmentList
}: DepartmentsTabProps) {
  const [editingItem, setEditingItem] = useState<Department | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Departments</CardTitle>
        <button 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
          onClick={() => {
            const newDepartment: Department = {
              id: `dept_${Date.now()}`,
              name: 'Personal'
            };
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
          {departmentList.map((dept) => (
            <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
              {editingItem?.id === dept.id ? (
                <div className="w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                    <select
                      value={dept.name}
                      onChange={(e) => {
                        const newDepts = [...departmentList];
                        const index = newDepts.findIndex(d => d.id === dept.id);
                        newDepts[index] = { ...dept, name: e.target.value as Department['name'] };
                        setDepartmentList(newDepts);
                      }}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Business">Business</option>
                      <option value="Loans">Loans</option>
                      <option value="Fraud">Fraud</option>
                      <option value="Wealth">Wealth</option>
                      <option value="Collections">Collections</option>
                    </select>
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
                    <h3 className="font-medium">{dept.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(dept)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDepartmentList(departmentList.filter(d => d.id !== dept.id))}
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
  );
} 