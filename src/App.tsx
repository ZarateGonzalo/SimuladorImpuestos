import "./App.css";
import { useEffect, useState } from "react";
import AbroadPurchase from "./sections/1-AbroadPurchase/AbroadPurchase";
import InternationalShipping from "./sections/2-InternationalShipping/InternationalShipping";
import ForeignManagement from "./sections/3-ForeignManagement/ForeignManagement";
import SpecialExpenses from "./sections/4-SpecialEpenses/SpecialExpenses";

export type SpecialExpense = {
  name: string;
  price: number; // USD
};

function App() {
  const [price, setPrice] = useState(1000);
  const [freightUsd, setFreightUsd] = useState(0);
  const [foreignMangementFee, setForeignMangementFee] = useState(0);

  // ✅ NEW: special expenses owned by parent
  const [specialExpenses, setSpecialExpenses] = useState<SpecialExpense[]>([]);

  useEffect(() => {
    //console.log("Purchase:", price);
    //console.log("Freight:", freightUsd);
    //console.log("Foreign Management Fee:", foreignMangementFee);
    //console.log("Special expenses:", specialExpenses);
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
        purchaseTotal={price}
        setForeignMangementFee={setForeignMangementFee}
      />
      <SpecialExpenses
        expenses={specialExpenses}
        setExpenses={setSpecialExpenses}
      />
      <button
        onClick={() =>
          alert(
            "El monto total a pagar es $" +
              (price +
                freightUsd +
                foreignMangementFee +
                specialExpenses.reduce(
                  (sum, expense) => sum + expense.price,
                  0,
                )),
          )
        }
      >
        Calcular Total
      </button>
    </main>
  );
}

export default App;
