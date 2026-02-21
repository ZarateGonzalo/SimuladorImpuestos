import { useEffect, useState } from "react";

type ForeignManagementProps = {
  purchaseTotal: number; // total de la compra en USD
  setForeignMangementFee: React.Dispatch<React.SetStateAction<number>>;
  setInsuranceFee: React.Dispatch<React.SetStateAction<number>>;
};

export default function ForeignManagement({
  purchaseTotal,
  setInsuranceFee,
  setForeignMangementFee,
}: ForeignManagementProps) {
  // --- USD inputs only ---
  const [agencyUsd, setAgencyUsd] = useState("0");
  const [insuranceUsd, setInsuranceUsd] = useState("0");

  // --- helpers ---
  const format2 = (n: number) => n.toFixed(2);

  const usdToPct = (usd: string) =>
    purchaseTotal === 0 ? "0.00" : format2((Number(usd) / purchaseTotal) * 100);

  const isValidNumber = (value: string) => {
    const n = Number(value);
    return value.trim() !== "" && !Number.isNaN(n);
  };

  useEffect(() => {
    if (isValidNumber(insuranceUsd)) {
      setInsuranceFee(Number(insuranceUsd));
    }
    if (isValidNumber(agencyUsd) && isValidNumber(insuranceUsd)) {
      setForeignMangementFee(Number(agencyUsd) + Number(insuranceUsd));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyUsd, insuranceUsd]);

  return (
    <div className="border p-4 space-y-4">
      <h2 className="font-bold">Gestión Extranjero</h2>

      {/* Agenciamiento */}
      <div className="flex items-center gap-2">
        <span className="w-28">Agenciamiento: </span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={agencyUsd}
          onChange={(e) => setAgencyUsd(e.target.value)}
          onBlur={() => {
            if (agencyUsd === "") {
              setAgencyUsd("0");
            } else {
              setAgencyUsd(format2(Number(agencyUsd)));
            }
          }}
        />
        <span> USD </span>

        <span className="text-sm text-gray-600">({usdToPct(agencyUsd)}%)</span>
      </div>

      {/* Seguro */}
      <div className="flex items-center gap-2">
        <span className="w-28">Seguro: </span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={insuranceUsd}
          onChange={(e) => setInsuranceUsd(e.target.value)}
          onBlur={() => {
            if (insuranceUsd === "") {
              setInsuranceUsd("0");
            } else {
              setInsuranceUsd(format2(Number(insuranceUsd)));
            }
          }}
        />
        <span> USD </span>

        <span className="text-sm text-gray-600">
          ({usdToPct(insuranceUsd)}%)
        </span>
      </div>
    </div>
  );
}
