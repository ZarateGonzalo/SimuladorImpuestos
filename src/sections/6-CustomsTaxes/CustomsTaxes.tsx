import { useEffect, useMemo, useState } from "react";

type CustomsTaxesProps = {
  productCostUsd: number;
  freightUsd: number;
  insuranceUsd: number;
  setTaxesExpenses: React.Dispatch<React.SetStateAction<number>>;
};

const format2 = (n: number) => n.toFixed(2);

export default function CustomsTaxes({
  productCostUsd,
  freightUsd,
  insuranceUsd,
  setTaxesExpenses,
}: CustomsTaxesProps) {
  const [igvPct, setIgvPct] = useState("18");
  const [perceptionPct, setPerceptionPct] = useState("3.5");

  useEffect(() => {
    const taxesCosts = igvUsd + perceptionUsd;
    setTaxesExpenses(taxesCosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [igvPct, perceptionPct]);

  // --- CIF ---
  const cif = useMemo(() => {
    return productCostUsd + freightUsd + insuranceUsd;
  }, [productCostUsd, freightUsd, insuranceUsd]);

  // --- IGV ---
  const igvUsd = useMemo(() => {
    return cif * (Number(igvPct) / 100 || 0);
  }, [cif, igvPct]);

  // --- Percepción (sobre CIF + IGV) ---
  const perceptionUsd = useMemo(() => {
    const base = cif + igvUsd;
    return base * (Number(perceptionPct) / 100 || 0);
  }, [cif, igvUsd, perceptionPct]);

  const totalTaxes = igvUsd + perceptionUsd;

  return (
    <div className="border p-4 space-y-3">
      <h2 className="font-bold">Impuestos de Aduanas</h2>

      <div>
        <strong>CIF (USD):</strong> {format2(cif)}
      </div>

      {/* IGV */}
      <div className="flex items-center gap-2">
        <span className="w-32">IGV (%):</span>

        <input
          type="number"
          step="any"
          className="border px-2 w-24"
          value={igvPct}
          onChange={(e) => setIgvPct(e.target.value)}
          onBlur={() => {
            if (igvPct === "") setIgvPct("0");
            else setIgvPct(format2(Number(igvPct)));
          }}
        />
      </div>

      <div>
        IGV (USD): <strong>{format2(igvUsd)}</strong>
      </div>

      {/* Percepción */}
      <div className="flex items-center gap-2">
        <span className="w-32">Percepción:</span>

        <select
          className="border px-2"
          value={perceptionPct}
          onChange={(e) => setPerceptionPct(e.target.value)}
        >
          <option value="3.5">3.5%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
        </select>
      </div>

      <div>
        Percepción (USD): <strong>{format2(perceptionUsd)}</strong>
      </div>

      <hr />

      <div>
        <strong>Total impuestos (USD): {format2(totalTaxes)}</strong>
      </div>
    </div>
  );
}
