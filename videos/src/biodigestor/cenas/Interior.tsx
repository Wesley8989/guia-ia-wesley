import { Liquido, Microbios, Resto, TanqueFundo } from "../cenario/Pecas";
import { LAMA, PAREDE, TANQUE } from "../util";
import { COR_LAMA, RESTOS_TANQUE } from "./comum";

// Interior do tanque: lama, restos e micróbios. Usa o tempo global para não "pular" entre cenas.
export const InteriorTanque: React.FC<{ t: number; microbios?: number }> = ({ t, microbios = 1 }) => (
  <>
    <TanqueFundo />
    <Liquido x={TANQUE.x + PAREDE} w={TANQUE.w - 2 * PAREDE} topo={LAMA} fundo={TANQUE.y + TANQUE.h - PAREDE} cor={COR_LAMA} t={t} />
    {RESTOS_TANQUE.map((r, i) => (
      <Resto key={i} tipo={r.tipo} x={r.x} y={r.y} rot={r.rot + Math.sin(t * 0.04 + i) * 6} escala={1.2} o={0.75} />
    ))}
    <Microbios n={16} t={t} o={microbios} />
  </>
);
