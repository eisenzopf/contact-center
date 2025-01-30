import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

type MultiSelectProps = {
  options: { id: string; name: string; }[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  label: string;
}

export function MultiSelect({ options, selectedIds, onChange, label }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        className="w-full border rounded-md px-3 py-2 text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selectedIds.length > 0
            ? `${selectedIds.length} selected`
            : 'Select options...'}
        </span>
        <ChevronsUpDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                const newSelected = selectedIds.includes(option.id)
                  ? selectedIds.filter(id => id !== option.id)
                  : [...selectedIds, option.id];
                onChange(newSelected);
              }}
            >
              <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center
                ${selectedIds.includes(option.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                {selectedIds.includes(option.id) && <Check className="h-3 w-3 text-white" />}
              </div>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 