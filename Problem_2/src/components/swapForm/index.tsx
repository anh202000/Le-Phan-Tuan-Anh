"use client";
import React from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import UseTokenPrices from "@src/hooks/useTokenPrices";
import Loader from "@src/components/loader";
import CurrencyInput from "@src/components/currencyInput";
import CurrencyDropDown from "@src/components/currencyDrop";

const SwapForm: React.FC = () => {
  const { options, loading, values, handleSetValue } = UseTokenPrices();

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropDown
          name="fromCurrency"
          label="From"
          value={values.fromCurrency}
          onChange={handleSetValue}
          options={options}
        />

        <div className="flex justify-center mb-5">
          <button
            type="button"
            onClick={() => { }}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <CurrencyDropDown
          name="toCurrency"
          label="To"
          value={values.toCurrency}
          onChange={handleSetValue}
          options={options}
        />
      </div>

      <div className="flex mt-5 justify-between items-end">
        <div className="w-[40%]">
        <CurrencyInput
          name="amount"
          label="Amount"
          value={values.amount}
          onChange={handleSetValue}
        />
        </div>

        <div className="w-[80%]">
          <h2 className="text-sm text-right font-semibold text-gray-700">
            {(values.amount || 0).toFixed(2)} {values.fromCurrency}
          </h2>
          <h2 className="my-2 text-2xl text-right font-semibold text-cyan-500">
            {(values.receive || 0).toFixed(2)} {values.toCurrency}
          </h2>
          <p className="text-[12px] text-right text-gray-700">
            Market rates collected - {new Date().toDateString()}
          </p>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
