import { Attribute } from '@/types/ontology';
import { Plus, Trash2 } from 'lucide-react';

type AttributeListProps = {
  attributes: Attribute[];
  onChange: (attributes: Attribute[]) => void;
}

export function AttributeList({ attributes, onChange }: AttributeListProps) {
  const handleAdd = () => {
    onChange([...attributes, { id: `attr_${Date.now()}`, name: '', value: '' }]);
  };

  const handleRemove = (id: string) => {
    onChange(attributes.filter(attr => attr.id !== id));
  };

  const handleChange = (id: string, field: 'name' | 'value', value: string) => {
    onChange(attributes.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Attributes</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Attribute
        </button>
      </div>

      {attributes.map((attr) => (
        <div key={attr.id} className="flex items-center space-x-4">
          <input
            type="text"
            value={attr.name}
            onChange={(e) => handleChange(attr.id, 'name', e.target.value)}
            placeholder="Name"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <input
            type="text"
            value={attr.value}
            onChange={(e) => handleChange(attr.id, 'value', e.target.value)}
            placeholder="Value"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            type="button"
            onClick={() => handleRemove(attr.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
} 