import { useEffect, useState } from "react";
import type { Currency } from "../../../types";

type Props = {
  currency: Currency;
  setCostoTotal: React.Dispatch<React.SetStateAction<number>>;
};

export default function AbroadCalculator({ currency, setCostoTotal }: Props) {
  // 🔹 number state (business logic)
  const [costoIndividual, setCostoIndividual] = useState(1000);
  const [cantidad, setCantidad] = useState(5);

  // 🔹 string state (input UX)
  const [costoInput, setCostoInput] = useState(costoIndividual.toString());
  const [cantidadInput, setCantidadInput] = useState(cantidad.toString());

  const costoTotal = costoIndividual * cantidad;

  // push total to parent
  useEffect(() => {
    setCostoTotal(costoTotal);
  }, [costoTotal, setCostoTotal]);

  // keep inputs synced if numbers change externally
  useEffect(() => {
    setCostoInput(costoIndividual.toString());
  }, [costoIndividual]);

  useEffect(() => {
    setCantidadInput(cantidad.toString());
  }, [cantidad]);

  return (
    <div>
      {/* Costo individual */}
      <div>
        <label>
          Costo individual:&nbsp;
          <input
            type="number"
            value={costoInput}
            onChange={(e) => {
              const val = e.target.value;
              setCostoInput(val);

              if (val !== "") {
                setCostoIndividual(Number(val));
              }
            }}
            onBlur={() => {
              if (costoInput === "") {
                setCostoInput("0");
                setCostoIndividual(0);
              }
            }}
          />
          &nbsp;{currency}
        </label>
      </div>

      {/* Cantidad */}
      <div>
        <label>
          Cantidad:&nbsp;
          <input
            type="number"
            value={cantidadInput}
            onChange={(e) => {
              const val = e.target.value;
              setCantidadInput(val);

              if (val !== "") {
                setCantidad(Number(val));
              }
            }}
            onBlur={() => {
              if (cantidadInput === "") {
                setCantidadInput("0");
                setCantidad(0);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
