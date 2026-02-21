import "./App.css";
import { useMemo, useState } from "react";
import AbroadPurchase from "./sections/1-AbroadPurchase/AbroadPurchase";
import InternationalShipping from "./sections/2-InternationalShipping/InternationalShipping";
import ForeignManagement from "./sections/3-ForeignManagement/ForeignManagement";
import SpecialExpenses from "./sections/4-SpecialEpenses/SpecialExpenses";
import CustomsExpenses from "./sections/5-CustomsExpenses/CustomsExpenses";
import CustomsTaxes from "./sections/6-CustomsTaxes/CustomsTaxes";
import LocalLogistics from "./sections/7-LocalLogistics/LocalLogistics";
import Result from "./sections/7-Result/Result";

export type SpecialExpense = {
  name: string;
  price: number; // USD
};

function App() {
  const [price, setPrice] = useState(1000);
  const [units, setUnits] = useState(5);
  const [dollarPrice, setDollarPrice] = useState(3.5);
  const [freightUsd, setFreightUsd] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [foreignMangementFee, setForeignMangementFee] = useState(0);
  const [specialExpenses, setSpecialExpenses] = useState<SpecialExpense[]>([]);
  const [customsExpenses, setCustomsExpenses] = useState(0);
  const [taxesExpenses, setTaxesExpenses] = useState(0);
  const [logisticsUsd, setLogisticsUsd] = useState(0);
  const finalCost = useMemo(() => {
    return (
      price +
      freightUsd +
      foreignMangementFee +
      specialExpenses.reduce((sum, expense) => sum + expense.price, 0) +
      customsExpenses +
      taxesExpenses +
      logisticsUsd
    );
  }, [
    price,
    freightUsd,
    foreignMangementFee,
    specialExpenses,
    customsExpenses,
    taxesExpenses,
    logisticsUsd,
  ]);

  return (
    <main>
      <h1>Simulación Aduana</h1>

      <AbroadPurchase
        setDollarPriceUsd={setDollarPrice}
        setCostoTotalUsd={setPrice}
        setUnits={setUnits}
      />

      <InternationalShipping setFreightUsd={setFreightUsd} />

      <ForeignManagement
        setInsuranceFee={setInsurance}
        purchaseTotal={price}
        setForeignMangementFee={setForeignMangementFee}
      />
      <SpecialExpenses
        expenses={specialExpenses}
        setExpenses={setSpecialExpenses}
      />
      <CustomsExpenses
        purchaseTotal={price}
        setCustomsExpenses={setCustomsExpenses}
      />
      <CustomsTaxes
        insuranceUsd={insurance}
        productCostUsd={price}
        freightUsd={freightUsd}
        setTaxesExpenses={setTaxesExpenses}
      />
      <LocalLogistics
        abroadPriceUsd={price}
        setLogisticsUsd={setLogisticsUsd}
      />
      <Result
        originalPriceUsd={price}
        finalUsdTotal={finalCost}
        finalPenTotal={finalCost * dollarPrice}
        units={units}
      />
    </main>
  );
}

export default App;
