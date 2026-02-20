import { useEffect, useState } from "react";

type ForeignManagementProps = {
  purchaseTotal: number; // total de la compra en USD
};

export default function ForeignManagement({
  purchaseTotal,
}: ForeignManagementProps) {
  // --- Agenciamiento ---
  const [agencyPct, setAgencyPct] = useState("0");
  const [agencyUsd, setAgencyUsd] = useState("0");

  // --- Seguro ---
  const [insurancePct, setInsurancePct] = useState("0");
  const [insuranceUsd, setInsuranceUsd] = useState("0");

  // --- helpers ---
  const pctToUsd = (pct: string) => purchaseTotal * (Number(pct) / 100);

  const usdToPct = (usd: string) =>
    purchaseTotal === 0 ? 0 : (Number(usd) / purchaseTotal) * 100;

  const format2 = (n: number) => n.toFixed(2);

  // --- when purchase total changes ---
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgencyUsd(format2(pctToUsd(agencyPct)));
    setInsuranceUsd(format2(pctToUsd(insurancePct)));
  }, [purchaseTotal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="border p-4 space-y-4">
      <h2 className="font-bold">Gestión Extranjero</h2>

      {/* Agenciamiento */}
      <div className="flex items-center gap-2">
        <span className="w-28">Agenciamiento:</span>

        <input
          type="number"
          step="any"
          className="border px-2 w-24"
          value={agencyPct}
          onChange={(e) => {
            const val = e.target.value;
            setAgencyPct(val);
            setAgencyUsd(format2(pctToUsd(val)));
          }}
          onBlur={() => {
            if (agencyPct === "") {
              setAgencyPct("0");
              setAgencyUsd("0");
            } else {
              setAgencyPct(format2(Number(agencyPct)));
            }
          }}
        />
        <span>%</span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={agencyUsd}
          onChange={(e) => {
            const val = e.target.value;
            setAgencyUsd(val);
            setAgencyPct(format2(usdToPct(val)));
          }}
          onBlur={() => {
            if (agencyUsd === "") {
              setAgencyUsd("0");
              setAgencyPct("0");
            } else {
              setAgencyUsd(format2(Number(agencyUsd)));
            }
          }}
        />
        <span>USD</span>
      </div>

      {/* Seguro */}
      <div className="flex items-center gap-2">
        <span className="w-28">Seguro:</span>

        <input
          type="number"
          step="any"
          className="border px-2 w-24"
          value={insurancePct}
          onChange={(e) => {
            const val = e.target.value;
            setInsurancePct(val);
            setInsuranceUsd(format2(pctToUsd(val)));
          }}
          onBlur={() => {
            if (insurancePct === "") {
              setInsurancePct("0");
              setInsuranceUsd("0");
            } else {
              setInsurancePct(format2(Number(insurancePct)));
            }
          }}
        />
        <span>%</span>

        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={insuranceUsd}
          onChange={(e) => {
            const val = e.target.value;
            setInsuranceUsd(val);
            setInsurancePct(format2(usdToPct(val)));
          }}
          onBlur={() => {
            if (insuranceUsd === "") {
              setInsuranceUsd("0");
              setInsurancePct("0");
            } else {
              setInsuranceUsd(format2(Number(insuranceUsd)));
            }
          }}
        />
        <span>USD</span>
      </div>
    </div>
  );
}
