import "./App.css";
import { useEffect, useState } from "react";
import AbroadPurchase from "./sections/1-AbroadPurchase/AbroadPurchase";
import InternationalShipping from "./sections/2-InternationalShipping/InternationalShipping";
import ForeignManagement from "./sections/3-ForeignManagement/ForeignManagement";
import SpecialExpenses from "./sections/4-SpecialEpenses/SpecialExpenses";
import CustomsExpenses from "./sections/5-CustomsExpenses/CustomsExpenses";
import CustomsTaxes from "./sections/6-CustomsTaxes/CustomsTaxes";

export type SpecialExpense = {
  name: string;
  price: number; // USD
};

function App() {
  const [price, setPrice] = useState(1000);
  const [freightUsd, setFreightUsd] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [foreignMangementFee, setForeignMangementFee] = useState(0);
  const [specialExpenses, setSpecialExpenses] = useState<SpecialExpense[]>([]);
  const [customsExpenses, setCustomsExpenses] = useState(0);
  const [taxesExpenses, setTaxesExpenses] = useState(0);

  useEffect(() => {
    //console.log("Purchase:", price);
    //console.log("Freight:", freightUsd);
    //console.log("Foreign Management Fee:", foreignMangementFee);
    //console.log("Special expenses:", specialExpenses);
    //console.log("Customs expenses:", customsExpenses);
    console.log(
      "Total:",
      price +
        freightUsd +
        foreignMangementFee +
        specialExpenses.reduce((sum, expense) => sum + expense.price, 0),
    );
  }, [price, freightUsd, specialExpenses, foreignMangementFee]);

  return (
    <main>
      <h1>Simulación Aduana</h1>

      <AbroadPurchase setCostoTotalUsd={setPrice} />

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
      <button
        onClick={() => {
          const costoFinal =
            price +
            freightUsd +
            foreignMangementFee +
            specialExpenses.reduce((sum, expense) => sum + expense.price, 0) +
            customsExpenses +
            taxesExpenses;
          alert("El monto total a pagar es $" + costoFinal.toFixed(2));
        }}
      >
        Calcular Total
      </button>
    </main>
  );
}

export default App;
