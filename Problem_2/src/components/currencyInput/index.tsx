import React from 'react';

interface CurrencyInputProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ name, label, value, onChange }) => {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-sm font-semibold text-gray-700">
        {label}
      </h2>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full p-2 border text-gray-700 shadow-sky-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
      />
    </div>
  );
};

export default CurrencyInput;