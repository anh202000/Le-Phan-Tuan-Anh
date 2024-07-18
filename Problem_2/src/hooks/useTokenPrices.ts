"use client";
import { useEffect, useState } from "react";
import { FormData, IpropToken } from "@src/interfaces";
import { fetchTokenPrices } from "@src/services/getTokenPrices";

const defaultValues: FormData = {
  fromCurrency: "",
  toCurrency: "",
  amount: 0,
  receive: 0,
};

const handleFindToken = (tokens: IpropToken[], data: string) =>
  tokens.find((token) => token.currency === data);

const updateValues = (
  newValues: Partial<FormData>,
  values: FormData,
  tokens: IpropToken[]
) => {
  const updatedValues = {
    ...values,
    ...newValues,
  };

  const fromToken = handleFindToken(tokens, updatedValues.fromCurrency);
  const toToken = handleFindToken(tokens, updatedValues.toCurrency);

  if (fromToken && toToken && updatedValues.amount) {
    const receive = updatedValues.amount * (toToken.price / fromToken.price);
    updatedValues.receive = parseFloat(receive.toFixed(2));
  }

  return updatedValues;
};

const UseTokenPrices = () => {
  const [tokens, setTokens] = useState<IpropToken[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<FormData>(defaultValues);

  useEffect(() => {
    const getTokenPrices = async () => {
      const data = await fetchTokenPrices();

      if (!data) return;

      setTokens(data);
      setOptions(data.map((token: IpropToken) => token.currency));
      setValues((prevState: FormData) => ({
        ...prevState,
        fromCurrency: data[0].currency,
        toCurrency: data[0].currency,
      }));
      setLoading(false);
    };

    getTokenPrices();
  }, []);

  const handleSetValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let updatedValues: Partial<FormData> = {
      [name]: name === "amount" ? parseFloat(value) : value,
    };

    setValues(updateValues(updatedValues, values, tokens));
  };

  const swapCurrencies = () => {
    setValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        fromCurrency: prevValues.toCurrency,
        toCurrency: prevValues.fromCurrency,
      };

      return updateValues(updatedValues, values, tokens);
    });
  };

  return {
    loading,
    tokens,
    options,
    values,
    setValues,
    handleSetValue,
    handleFindToken,
    swapCurrencies,
  };
};

export default UseTokenPrices;
