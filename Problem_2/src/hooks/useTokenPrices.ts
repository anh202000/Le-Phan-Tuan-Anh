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

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const newValues = {
      ...values,
      [name]: value,
    };

    if (name === "amount") {
      newValues[name] = parseFloat(value);
    }

    const fromToken = handleFindToken(tokens, newValues.fromCurrency);
    const toToken = handleFindToken(tokens, newValues.toCurrency);

    if (fromToken && toToken && newValues.amount) {
      const receive = Number(newValues.amount) * (toToken.price / fromToken.price);
      setValues({ ...newValues, receive });
    } else {
      setValues(newValues);
    }
  };

  return { loading, tokens, options, values, setValues, handleSetValue, handleFindToken };
};

export default UseTokenPrices;