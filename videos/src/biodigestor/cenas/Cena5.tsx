import { Easing, useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Bolhas, Cadeado, CanoEntrada, Etiqueta, pontoNaEntrada, Resto, TanqueParedes, Tampa, TipoResto, ZonaGas } from "../cenario/Pecas";
import { ENTRADA, ip, LAMA, lerp, mola, TANQUE, useCena } from "../util";
import { InteriorTanque } from "./Interior";

const PELA_TAMPA: { tipo: TipoResto; x: number }[] = [
  { tipo: "tomate", x: 560 },
  { tipo: "banana", x: 630 },
  { tipo: "maca", x: 690 },
];
const PELO_CANO: TipoResto[] = ["cenoura", "maca", "alface"];

// Nuvem de gás escapando
export const Baforada: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  if (p <= 0 || p >= 1) return null;
  const s = 0.6 + p * 1.2;
  return (
    <g transform={`translate(${x},${y - p * 280}) scale(${s})`} opacity={1 - p}>
      <polygon points="-40,10 -30,-20 0,-34 30,-22 42,6 12,22 -20,20" fill="#BFE3FF" stroke="#FFFFFF" strokeWidth={3} />
    </g>
  );
};

// Cena 5: abrir a tampa deixa o gás escapar; o cano de entrada cria o selo d'água.
export const Cena5: React.FC = () => {
  const { frame, global, deixa, duracao } = useCena();
  const { fps } = useVideoConfig();

  const tAbre = deixa("abre");
  const tFecha = deixa("então");
  const angulo = -ip(frame, [tAbre, tAbre + 12], [0, 38], Easing.out(Easing.cubic)) * ip(frame, [tFecha, tFecha + 12], [1, 0]);
  const tEscapa = deixa("escapa");
  const tPreso = deixa("preso");
  const gas = frame < tPreso ? ip(frame, [tEscapa - 6, tEscapa + 20], [0.62, 0.12]) : ip(frame, [tPreso, tPreso + 40], [0.12, 0.62]);
  const tCano = deixa("cano");
  const cano = ip(frame, [tCano, tCano + 24], [0, 1], Easing.inOut(Easing.quad));
  const tMergulha = deixa("mergulha");
  const destaque = ip(frame, [tMergulha, tMergulha + 10], [0, 1]) * ip(frame, [tMergulha + 50, tMergulha + 65], [1, 0]);
  const tDesce = deixa("desce");
  const empurra = ip(frame, [duracao - 45, duracao - 8], [0, 22], Easing.inOut(Easing.quad));
  const tremor = empurra > 0 ? Math.sin(frame * 1.3) * 2.5 : 0;

  return (
    <Palco>
      <InteriorTanque t={global} />
      <ZonaGas o={gas} t={global} />
      <Bolhas x={TANQUE.x + 40} w={TANQUE.w - 80} de={LAMA + 140} ate={LAMA - 4} t={frame} n={14} cor="rgba(169,214,255,0.7)" semente="b5" />

      {PELA_TAMPA.map((r, i) => {
        const s = deixa("comida") - 4 + i * 5;
        const p = ip(frame, [s, s + 20], [0, 1], Easing.in(Easing.quad));
        const afunda = ip(frame, [s + 20, s + 50], [0, 1]);
        if (p <= 0) return null;
        return <Resto key={i} tipo={r.tipo} x={r.x} y={lerp(520, LAMA + 10, p) + afunda * 60} rot={p * 300} escala={1.2} o={1 - afunda * 0.6} />;
      })}
      {[0, 1, 2, 3, 4].map((i) => (
        <Baforada key={i} x={600 + i * 30} y={TANQUE.y - 30} p={ip(frame, [tEscapa - 4 + i * 5, tEscapa + 40 + i * 5], [0, 1])} />
      ))}

      <TanqueParedes />
      <CanoEntrada revela={cano} destaque={destaque} />
      {PELO_CANO.map((tipo, i) => {
        const s = tDesce - 8 + i * 9;
        const p = ip(frame, [s, s + 30], [0, 1], Easing.in(Easing.quad));
        if (p <= 0) return null;
        const [x, y] = pontoNaEntrada(p);
        const dentro = ip(frame, [s + 30, s + 60], [0, 1]);
        return <Resto key={i} tipo={tipo} x={x + dentro * (40 + i * 30)} y={y - 30 * (1 - p) + dentro * 20} rot={p * 200} escala={0.9} o={1 - dentro * 0.5} />;
      })}
      <Tampa ang={angulo} dy={-empurra + tremor} />
      <Etiqueta x={270} y={ENTRADA.y1 - 270} texto="ENTRADA" s={mola(frame, tCano + 10, fps)} alvo={[ENTRADA.x1, ENTRADA.y1 - 30]} />
      <Cadeado x={540} y={975} s={mola(frame, tPreso, fps)} />
    </Palco>
  );
};
