import type { Currency } from "../../../types";

type Props = {
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
};

export default function CurrencySelector({ currency, setCurrency }: Props) {
  return (
    <section>
      <label>
        <input
          type="radio"
          name="currency"
          checked={currency === "USD"}
          onChange={() => setCurrency("USD")}
        />
        Costo en USD
      </label>

      <label style={{ marginLeft: 20 }}>
        <input
          type="radio"
          name="currency"
          checked={currency === "PEN"}
          onChange={() => setCurrency("PEN")}
        />
        Costo en PEN
      </label>
    </section>
  );
}
