import { useEffect, useMemo, useState } from "react";
import type { Currency } from "../../types";

import CurrencySelector from "./components/CurrencySelector";
import AbroadCalculator from "./components/AbroadCalculator";
import ExchangeRateInput from "./components/ExchangeRateInput";

type AbroadPurchaseProps = {
  setCostoTotalUsd: React.Dispatch<React.SetStateAction<number>>;
};

export default function AbroadPurchase({
  setCostoTotalUsd,
}: AbroadPurchaseProps) {
  // 🔹 UI state only
  const [currency, setCurrency] = useState<Currency>("USD");
  const [price, setPrice] = useState<number>(0);
  const [dollarPrice, setDollarPrice] = useState<number>(3.5); // 1 USD = X PEN

  const displayedCost = useMemo(() => {
    if (currency === "USD") {
      return price;
    }

    if (dollarPrice === 0) return 0;

    return price / dollarPrice;
  }, [currency, price, dollarPrice]);

  // 🔹 DISPLAY ONLY (never stored)
  useEffect(() => {
    if (currency === "USD") {
      setCostoTotalUsd(price);
    } else if (dollarPrice === 0) {
      setCostoTotalUsd(0);
    } else {
      setCostoTotalUsd(price / dollarPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, price, dollarPrice]);

  return (
    <section>
      <h2>Compra Exterior</h2>

      {/* Currency selector (UI only) */}
      <CurrencySelector currency={currency} setCurrency={setCurrency} />

      {/* Calculator ALWAYS outputs USD */}
      <AbroadCalculator currency={currency} setCostoTotal={setPrice} />

      {/* Exchange rate */}
      <ExchangeRateInput
        dollarPrice={dollarPrice}
        setDollarPrice={setDollarPrice}
      />

      {/* Final display */}
      <div>
        <strong>Costo total compra (USD): {displayedCost.toFixed(2)}</strong>
      </div>
    </section>
  );
}
