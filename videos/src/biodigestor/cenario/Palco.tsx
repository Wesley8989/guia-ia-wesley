import { random } from "remotion";
import { CHAO, H, useCena, W } from "../util";
import { Anao, Humor } from "./Anao";
import { P } from "./Pecas";

// Paleta do solo em corte (low poly: triângulos com tons levemente diferentes)
const TONS_SOLO = ["#8B5A2B", "#7E5126", "#94643A", "#86562C", "#7A4D24"];
const TONS_GRAMA = ["#6BBF59", "#5AA84A", "#7FD06B", "#62B552"];

type Tri = { p: string; f: string };

const escurecer = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (s: number) => Math.round(((n >> s) & 255) * (1 - t));
  return `rgb(${c(16)},${c(8)},${c(0)})`;
};

const malha = (
  x0: number,
  y0: number,
  colunas: number,
  linhas: number,
  dx: number,
  dy: number,
  semente: string,
  cor: (linha: number, i: number) => string,
  fixarBordas: boolean,
): Tri[] => {
  const pt = (c: number, l: number) => {
    const borda = fixarBordas && (l === 0 || l === linhas);
    const jx = (random(`${semente}x${c}-${l}`) - 0.5) * dx * 0.5;
    const jy = borda ? 0 : (random(`${semente}y${c}-${l}`) - 0.5) * dy * 0.45;
    return [x0 + c * dx + jx, y0 + l * dy + jy];
  };
  const tris: Tri[] = [];
  let i = 0;
  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      const a = pt(c, l), b = pt(c + 1, l), d = pt(c, l + 1), e = pt(c + 1, l + 1);
      const s = (q: number[][]) => q.map((v) => v.join(",")).join(" ");
      tris.push({ p: s([a, b, e]), f: cor(l, i++) });
      tris.push({ p: s([a, e, d]), f: cor(l, i++) });
    }
  }
  return tris;
};

const SOLO = malha(-260, CHAO, 24, 17, 120, 110, "solo", (l, i) =>
  escurecer(TONS_SOLO[Math.floor(random(`ts${i}`) * TONS_SOLO.length)], Math.min(0.45, l * 0.035)), true);

const GRAMA = malha(-260, 760, 48, 2, 60, 35, "grama", (_l, i) =>
  TONS_GRAMA[Math.floor(random(`tg${i}`) * TONS_GRAMA.length)], true);

const CEU = malha(-260, -600, 13, 7, 220, 200, "ceu", (_l, i) =>
  random(`tc${i}`) > 0.5 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0)", false);

const PEDRAS: [number, number, number][] = [
  [110, 1110, 1], [210, 1520, 1.3], [980, 1420, 1.1], [70, 1760, 1.5], [1010, 1700, 1.2], [620, 1480, 0.9], [1300, 1200, 1.2],
];

const Nuvem: React.FC<{ x: number; y: number; e: number }> = ({ x, y, e }) => (
  <g transform={`translate(${x},${y}) scale(${e})`}>
    <P p="-90,20 -60,-20 -20,-40 30,-50 70,-25 100,20" f="#FFFFFF" />
    <P p="-20,-40 30,-50 70,-25 20,20" f="#EAF4FF" />
    <P p="-90,20 -60,-20 -20,20" f="#F4F9FF" />
  </g>
);

const Arvore: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <P p="-10,0 10,0 7,-90 -7,-90" f="#7A4E24" />
    <P p="-70,-80 -40,-170 0,-200 45,-165 70,-90 30,-60 -30,-60" f="#3E8E41" />
    <P p="0,-200 45,-165 70,-90 10,-110" f="#2F7A35" />
    <P p="-70,-80 -40,-170 0,-200 10,-110" f="#4FA653" />
    <P p="-70,-80 10,-110 30,-60 -30,-60" f="#367F3A" />
  </g>
);

const Casa: React.FC = () => (
  <g>
    {/* parede lateral (3D) */}
    <P p="880,610 950,580 950,750 880,772" f="#D9B57E" />
    {/* telhado lateral */}
    <P p="760,500 830,470 965,575 890,606" f="#A8432F" />
    <P p="760,500 830,470 900,520 820,548" f="#B84A35" />
    {/* frente */}
    <P p="640,610 880,610 880,772 640,772" f="#F2D7A6" />
    <P p="640,610 760,610 760,772 640,772" f="#F7E1B8" />
    <P p="626,612 760,498 894,612" f="#C8553D" />
    <P p="760,498 894,612 760,612" f="#B04A34" />
    {/* chaminé */}
    <P p="850,505 878,505 878,560 850,540" f="#8C3B2B" />
    {/* porta e janelas */}
    <P p="735,690 785,690 785,772 735,772" f="#6B3E26" />
    <circle cx={776} cy={732} r={4} fill="#FFC300" />
    <P p="660,640 715,640 715,690 660,690" f="#9ED8F0" />
    <P p="660,640 715,640 660,690" f="#C3E9F8" />
    <P p="805,640 860,640 860,690 805,690" f="#9ED8F0" />
    <P p="805,640 860,640 805,690" f="#C3E9F8" />
  </g>
);

type Props = {
  camera?: { escala: number; tx: number; ty: number }; // tela = escala * mundo + (tx, ty)
  escuro?: number; // 0..1, céu fechado de chuva
  humor?: Humor;
  pulo?: number;
  children?: React.ReactNode;
  frente?: React.ReactNode;
};

// Cenário base: quintal com casa, relva, solo em corte e o anão de jardim.
export const Palco: React.FC<Props> = ({ camera, escuro = 0, humor = "normal", pulo = 0, children, frente }) => {
  const { global } = useCena();
  const cam = camera ?? { escala: 1, tx: 0, ty: 0 };
  const transformacao = `translate(${cam.tx},${cam.ty}) scale(${cam.escala})`;
  const deriva = global * 0.35;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5DB7F0" />
          <stop offset="1" stopColor="#CDEEFF" />
        </linearGradient>
        <linearGradient id="ceu-chuva" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A5568" />
          <stop offset="1" stopColor="#8A97A8" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={W} height={H} fill="#5DB7F0" />
      <g transform={transformacao}>
        <rect x={-400} y={-700} width={3200} height={1500} fill="url(#ceu)" />
        <rect x={-400} y={-700} width={3200} height={1500} fill="url(#ceu-chuva)" opacity={escuro} />
        {CEU.map((t, i) => (
          <P key={i} p={t.p} f={t.f} />
        ))}
        <g opacity={1 - escuro * 0.5}>
          <Nuvem x={((150 + deriva) % 1700) - 200} y={220} e={1} />
          <Nuvem x={((900 + deriva * 0.7) % 1700) - 200} y={360} e={0.8} />
          <Nuvem x={((1400 + deriva * 0.5) % 1700) - 200} y={120} e={1.2} />
        </g>
        {/* colinas */}
        <P p="-260,775 -260,640 60,590 330,660 600,600 900,650 1200,585 1700,660 2000,610 2600,660 2600,775" f="#4E9F48" />
        <P p="60,590 330,660 200,775 -100,775" f="#459140" />
        <P p="600,600 900,650 800,775 500,775" f="#56AA4F" />
        <P p="1200,585 1700,660 1600,775 1100,775" f="#459140" />
        <Arvore x={250} y={772} />
        <Arvore x={1240} y={770} />
        <Casa />
        {GRAMA.map((t, i) => (
          <P key={i} p={t.p} f={t.f} />
        ))}
        {SOLO.map((t, i) => (
          <P key={i} p={t.p} f={t.f} />
        ))}
        {PEDRAS.map(([x, y, e], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${e})`}>
            <P p="-24,8 -16,-12 6,-16 24,-4 20,12 -6,16" f="#8E8E8E" />
            <P p="6,-16 24,-4 20,12 0,0" f="#767676" />
          </g>
        ))}
        {children}
        <Anao x={95} y={CHAO + 4} humor={humor} pulo={pulo} t={global} />
        {frente}
        <rect x={-400} y={-700} width={3200} height={3400} fill="#1E2A3A" opacity={escuro * 0.18} />
      </g>
    </svg>
  );
};
