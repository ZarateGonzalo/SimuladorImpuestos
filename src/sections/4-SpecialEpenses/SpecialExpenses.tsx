import { useState } from "react";
import type { SpecialExpense } from "../../App";

type Props = {
  expenses: SpecialExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<SpecialExpense[]>>;
};

export default function SpecialExpenses({ expenses, setExpenses }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addExpense = () => {
    if (!name || !price) return;

    setExpenses((prev) => [...prev, { name, price: Number(price) }]);

    setName("");
    setPrice("");
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border p-4 space-y-3">
      <h2 className="font-bold">Gastos Especiales</h2>

      {/* Add new expense */}
      <div className="flex items-center gap-2">
        <input
          className="border px-2 py-1 w-40"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="border px-2 py-1 w-28"
          placeholder="Costo USD"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={addExpense}
          className="px-2 font-bold text-lg"
          title="Add"
        >
          +
        </button>
      </div>

      {/* List */}
      {expenses.map((exp, i) => (
        <div
          key={i}
          className="flex items-center justify-between border px-2 py-1"
        >
          <span>
            {exp.name} — <b>${exp.price.toFixed(2)}</b>
          </span>

          <button
            onClick={() => removeExpense(i)}
            className="text-red-500 font-bold"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
