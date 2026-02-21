import { useMemo, useState } from "react";

type LocalLogisticsProps = {
  abroadPriceUsd: number;
  setLogisticsUsd: (value: number) => void;
};

const format2 = (n: number) => n.toFixed(2);

export default function LocalLogistics({
  abroadPriceUsd,
  setLogisticsUsd,
}: LocalLogisticsProps) {
  const [internalTransport, setInternalTransport] = useState("0");
  const [storage, setStorage] = useState("0");
  const [provinceShipping, setProvinceShipping] = useState("0");

  const logisticsTotal = useMemo(() => {
    const total =
      Number(internalTransport || 0) +
      Number(storage || 0) +
      Number(provinceShipping || 0);

    setLogisticsUsd(total);
    return total;
  }, [internalTransport, storage, provinceShipping, setLogisticsUsd]);

  const usdToPct = (usd: string) =>
    abroadPriceUsd === 0
      ? "0.00"
      : format2((Number(usd || 0) / abroadPriceUsd) * 100);

  return (
    <div className="border p-4 space-y-3">
      <h2 className="font-bold">Logística Perú</h2>

      {/* Transporte interno */}
      <div className="flex items-center gap-2">
        <span className="w-40">Transporte interno: </span>
        <input
          type="number"
          className="border px-2 w-32"
          value={internalTransport}
          onChange={(e) => setInternalTransport(e.target.value)}
          onBlur={() =>
            setInternalTransport(format2(Number(internalTransport || 0)))
          }
        />
        <span> USD </span>
        <span className="text-sm text-gray-600">
          ({usdToPct(internalTransport)}%)
        </span>
      </div>

      {/* Resguardo */}
      <div className="flex items-center gap-2">
        <span className="w-40">Resguardo: </span>
        <input
          type="number"
          className="border px-2 w-32"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          onBlur={() => setStorage(format2(Number(storage || 0)))}
        />
        <span> USD </span>
        <span className="text-sm text-gray-600">({usdToPct(storage)}%)</span>
      </div>

      {/* Envío provincia */}
      <div className="flex items-center gap-2">
        <span className="w-40">Envío provincia: </span>
        <input
          type="number"
          className="border px-2 w-32"
          value={provinceShipping}
          onChange={(e) => setProvinceShipping(e.target.value)}
          onBlur={() =>
            setProvinceShipping(format2(Number(provinceShipping || 0)))
          }
        />
        <span> USD </span>
        <span className="text-sm text-gray-600">
          ({usdToPct(provinceShipping)}%)
        </span>
      </div>

      <div className="pt-2 font-semibold">
        Total logística USD: {format2(logisticsTotal)}
      </div>
    </div>
  );
}
