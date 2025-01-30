import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { AccountType } from '@/types/ontology';

interface AccountTypesTabProps {
  accountTypes: AccountType[];
  setAccountTypes: (accountTypes: AccountType[]) => void;
}

export function AccountTypesTab({
  accountTypes,
  setAccountTypes
}: AccountTypesTabProps) {
  const [editingItem, setEditingItem] = useState<AccountType | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Account Types</CardTitle>
        <button 
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary-hover)]"
          onClick={() => {
            const newAccountType: AccountType = {
              id: `at_${Date.now()}`,
              name: '',
              order: accountTypes.length,
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
                      onClick={() => setAccountTypes(accountTypes.filter(a => a.id !== at.id))}
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