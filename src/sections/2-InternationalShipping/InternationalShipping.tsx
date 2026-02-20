import { useEffect, useState } from "react";

type FreightType = "AIR" | "SEA";
type Unit = "kg" | "m3";

type Props = {
  setFreightUsd: React.Dispatch<React.SetStateAction<number>>;
};

export default function InternationalShipping({ setFreightUsd }: Props) {
  // selectors
  const [freightType, setFreightType] = useState<FreightType>("AIR");
  const [unit, setUnit] = useState<Unit>("kg");

  // numeric state (business logic)
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [amount, setAmount] = useState(0);

  // string state (input UX)
  const [priceInput, setPriceInput] = useState("0");
  const [amountInput, setAmountInput] = useState("0");

  const freightTotal = pricePerUnit * amount;

  // push result UP to parent
  useEffect(() => {
    setFreightUsd(freightTotal);
  }, [freightTotal, setFreightUsd]);

  return (
    <section>
      <h2>Transporte Internacional (USD)</h2>

      {/* Freight type */}
      <div>
        <label>
          <input
            type="radio"
            checked={freightType === "AIR"}
            onChange={() => setFreightType("AIR")}
          />
          Aéreo ✈️
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            checked={freightType === "SEA"}
            onChange={() => setFreightType("SEA")}
          />
          Marítimo 🚢
        </label>
      </div>

      {/* Unit toggle */}
      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={() => setUnit("kg")}>
          kg
        </button>

        <button
          type="button"
          onClick={() => setUnit("m3")}
          style={{ marginLeft: 8 }}
        >
          m³
        </button>
      </div>

      {/* Price per unit */}
      <div style={{ marginTop: 12 }}>
        <label>
          Costo por {unit + " (USD) "}:&nbsp;
          <input
            type="number"
            value={priceInput}
            onChange={(e) => {
              const val = e.target.value;
              setPriceInput(val);

              if (val !== "") {
                setPricePerUnit(Number(val));
              }
            }}
            onBlur={() => {
              if (priceInput === "") {
                setPriceInput("0");
                setPricePerUnit(0);
              }
            }}
          />
        </label>
      </div>

      {/* Amount */}
      <div style={{ marginTop: 8 }}>
        <label>
          Cantidad ({unit}) :&nbsp;
          <input
            type="number"
            value={amountInput}
            onChange={(e) => {
              const val = e.target.value;
              setAmountInput(val);

              if (val !== "") {
                setAmount(Number(val));
              }
            }}
            onBlur={() => {
              if (amountInput === "") {
                setAmountInput("0");
                setAmount(0);
              }
            }}
          />
        </label>
      </div>

      {/* Result */}
      <div style={{ marginTop: 12 }}>
        <strong>Flete (USD) : {freightTotal.toFixed(2)}</strong>
      </div>
    </section>
  );
}
