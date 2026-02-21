type ResultProps = {
  finalUsdTotal: number;
  finalPenTotal: number;
  units: number;
  originalPriceUsd: number;
};

const format2 = (n: number) => n.toFixed(2);

export default function Result({
  finalUsdTotal,
  finalPenTotal,
  units,
  originalPriceUsd,
}: ResultProps) {
  const unitPricePen = units === 0 ? 0 : finalPenTotal / units;

  const importIndex =
    originalPriceUsd === 0 ? 0 : finalUsdTotal / originalPriceUsd;

  return (
    <div className="border p-4 space-y-3">
      <h2 className="font-bold">Resultados</h2>

      <div>
        <strong>Costo Final USD:</strong> {format2(finalUsdTotal)}
      </div>

      <div>
        <strong>Costo Final PEN:</strong> {format2(finalPenTotal)}
      </div>

      <div>
        <strong>Costo unitario PEN:</strong> {format2(unitPricePen)}
      </div>

      <div>
        <strong>Índice Importación:</strong> {format2(importIndex)}
      </div>
    </div>
  );
}
