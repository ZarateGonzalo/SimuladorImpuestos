import { useState } from "react";

type Props = {
  dollarPrice: number;
  setDollarPrice: (value: number) => void;
};

export default function ExchangeRateInput({
  dollarPrice,
  setDollarPrice,
}: Props) {
  const [inputValue, setInputValue] = useState(
    dollarPrice === 0 ? "" : dollarPrice.toString(),
  );

  return (
    <div>
      <h3>Tipo de Cambio</h3>
      <label>
        Precio USD:&nbsp;
        <input
          type="number"
          step="0.01"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);

            if (e.target.value !== "") {
              setDollarPrice(Number(e.target.value));
            }
          }}
          onBlur={() => {
            if (inputValue === "") {
              setInputValue("0");
              setDollarPrice(0);
            }
          }}
        />
      </label>
    </div>
  );
}
