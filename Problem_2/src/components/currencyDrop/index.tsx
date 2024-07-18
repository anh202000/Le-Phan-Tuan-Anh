import React, { useId } from 'react';

interface CurrencyDropDownProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options: string[];
}

const CurrencyDropDown: React.FC<CurrencyDropDownProps> = ({ name, label, onChange, value, options }) => {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-sm font-semibold text-gray-700">
        {label}
      </h2>

      <select
        value={value}
        name={`${name}`}
        onChange={onChange}
        required
        className="w-full max-h-[-10rem] text-gray-700 p-2 shadow-sky-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={useId()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropDown;