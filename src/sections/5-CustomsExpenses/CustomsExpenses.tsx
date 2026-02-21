import { useEffect, useState } from "react";

type CustomsExpensesProps = {
  purchaseTotal: number; // total compra en USD (abroad)
  setCustomsExpenses: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomsExpenses({
  purchaseTotal,
  setCustomsExpenses,
}: CustomsExpensesProps) {
  const [storageUsd, setStorageUsd] = useState("0"); // Almacenaje
  const [customsUsd, setCustomsUsd] = useState("0"); // Gastos Aduana
  const [arrivalNoticeUsd, setArrivalNoticeUsd] = useState("0"); // Aviso Llegada

  const toNumber = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  useEffect(() => {
    const customsCosts =
      toNumber(storageUsd) + toNumber(customsUsd) + toNumber(arrivalNoticeUsd);
    setCustomsExpenses(customsCosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageUsd, customsUsd, arrivalNoticeUsd]);

  const format2 = (n: number) => n.toFixed(2);

  const usdToPct = (usd: string) => {
    const value = Number(usd);
    if (!purchaseTotal || isNaN(value)) return "0.00";
    return format2((value / purchaseTotal) * 100);
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    if (value === "" || isNaN(Number(value))) {
      setter("0.00");
    } else {
      setter(format2(Number(value)));
    }
  };

  return (
    <div className="border p-4 space-y-4">
      <h2 className="font-bold">Gastos Aduaneros</h2>

      {/* Aviso de Llegada */}
      <div className="flex items-center gap-2">
        <span className="w-32">Aviso Llegada: </span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={arrivalNoticeUsd}
          onChange={(e) => setArrivalNoticeUsd(e.target.value)}
          onBlur={() => handleBlur(setArrivalNoticeUsd, arrivalNoticeUsd)}
        />
        <span> USD </span>

        <span className="text-sm text-gray-600">
          ({usdToPct(arrivalNoticeUsd)}%)
        </span>
      </div>

      {/* Almacenaje */}
      <div className="flex items-center gap-2">
        <span className="w-32">Almacenaje: </span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={storageUsd}
          onChange={(e) => setStorageUsd(e.target.value)}
          onBlur={() => handleBlur(setStorageUsd, storageUsd)}
        />
        <span> USD </span>

        <span className="text-sm text-gray-600">({usdToPct(storageUsd)}%)</span>
      </div>

      {/* Gastos Aduana */}
      <div className="flex items-center gap-2">
        <span className="w-32">Gastos Aduana: </span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={customsUsd}
          onChange={(e) => setCustomsUsd(e.target.value)}
          onBlur={() => handleBlur(setCustomsUsd, customsUsd)}
        />
        <span> USD </span>

        <span className="text-sm text-gray-600">({usdToPct(customsUsd)}%)</span>
      </div>
    </div>
  );
}
