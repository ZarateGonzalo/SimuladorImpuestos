import "./App.css";
import { useEffect, useState } from "react";
import AbroadPurchase from "./sections/1-AbroadPurchase/AbroadPurchase";
import InternationalShipping from "./sections/2-InternationalShipping/InternationalShipping";
import ForeignManagement from "./sections/3-ForeignManagement/ForeignManagement";

function App() {
  const [price, setPrice] = useState(1000);
  const [freightUsd, setFreightUsd] = useState(0);
  useEffect(() => {
    console.log(price);
    console.log(freightUsd);
  }, [price, freightUsd]);
  return (
    <main>
      <h1>Simulación Aduana</h1>
      <AbroadPurchase setCostoTotalUsd={setPrice} />
      <InternationalShipping setFreightUsd={setFreightUsd} />
      <ForeignManagement purchaseTotal={price} />
    </main>
  );
}

export default App;
