import React, { useMemo } from "react";
import { useWalletBalances, usePrices } from "path/to/hooks"; // Adjust the import paths
import WalletRow from "path/to/WalletRow"; // Adjust the import paths
import { BoxProps } from "path/to/types"; // Adjust the import paths

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const priorityMap: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => {
  return priorityMap[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      const formattedBalance: FormattedWalletBalance = {
        ...balance,
        formatted: balance.amount.toFixed(2),
      };

      return (
        <WalletRow
          key={index}
          className={classes.row}
          amount={formattedBalance.amount}
          usdValue={usdValue}
          formattedAmount={formattedBalance.formatted}
        />
      );
    });
  }, [sortedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
