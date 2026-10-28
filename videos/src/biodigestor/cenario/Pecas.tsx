import { random } from "remotion";
import { CHAO, ENTRADA, FONTE, LAMA, lerp, PAREDE, POCO, TANQUE } from "../util";

// Polígono low poly: o traço da mesma cor evita frestas entre facetas.
export const P: React.FC<{ p: string; f: string; o?: number }> = ({ p, f, o }) => (
  <polygon points={p} fill={f} stroke={f} strokeWidth={0.8} strokeLinejoin="round" opacity={o} />
);

/* ---------- Restos de comida ---------- */

export type TipoResto = "maca" | "banana" | "cenoura" | "alface" | "tomate" | "laranja";

export const Resto: React.FC<{ tipo: TipoResto; x: number; y: number; rot?: number; escala?: number; o?: number }> = ({
  tipo,
  x,
  y,
  rot = 0,
  escala = 1,
  o = 1,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${escala})`} opacity={o}>
    {tipo === "maca" && (
      <>
        <P p="-18,-8 -10,-18 0,-14 10,-18 18,-8 18,8 8,18 -8,18 -18,8" f="#D62839" />
        <P p="0,-14 10,-18 18,-8 18,8 8,18 0,4" f="#B51F2E" />
        <P p="-10,-10 -4,-12 -8,0 -14,-2" f="#F25C6A" />
        <P p="-1,-14 1,-14 3,-24 1,-24" f="#5C3A1E" />
        <P p="2,-20 14,-26 10,-18" f="#4CAF50" />
      </>
    )}
    {tipo === "banana" && (
      <>
        <P p="-28,-4 -18,6 -2,12 14,10 26,0 28,-6 20,-2 6,2 -10,0 -22,-8" f="#FFD23F" />
        <P p="-18,6 -2,12 14,10 26,0 6,2 -10,0" f="#E8B923" />
        <P p="-28,-4 -22,-8 -26,-11 -32,-6" f="#5C3A1E" />
      </>
    )}
    {tipo === "cenoura" && (
      <>
        <P p="-8,-20 8,-20 0,26" f="#F77F00" />
        <P p="0,-20 8,-20 0,26" f="#D96C00" />
        <P p="-6,-20 -12,-36 -2,-22" f="#4CAF50" />
        <P p="-2,-20 0,-38 4,-20" f="#3E9142" />
        <P p="2,-22 12,-34 6,-20" f="#4CAF50" />
      </>
    )}
    {tipo === "alface" && (
      <>
        <P p="-22,0 -14,-16 0,-22 14,-16 22,0 14,14 0,18 -14,14" f="#7BC950" />
        <P p="0,-22 14,-16 22,0 14,14 0,18 0,0" f="#5EA83A" />
        <P p="-14,-16 0,-22 0,0 -22,0" f="#9BE06A" />
      </>
    )}
    {tipo === "tomate" && (
      <>
        <P p="-15,-6 -8,-15 8,-15 15,-6 15,6 8,15 -8,15 -15,6" f="#E63946" />
        <P p="8,-15 15,-6 15,6 8,15 0,0" f="#C1121F" />
        <P p="-6,-14 0,-10 6,-14 3,-8 8,-6 0,-6 -8,-6 -3,-8" f="#2D6A4F" />
      </>
    )}
    {tipo === "laranja" && (
      <>
        <P p="-20,0 -17,-10 -10,-17 0,-20 10,-17 17,-10 20,0" f="#FF9F1C" />
        <P p="-15,0 -12,-8 -7,-13 0,-15 7,-13 12,-8 15,0" f="#FFD59E" />
      </>
    )}
  </g>
);

/* ---------- Buraco, terra e ferramentas ---------- */

export const Buraco: React.FC<{ x: number; w: number; prof: number; o?: number }> = ({ x, w, prof, o = 1 }) => {
  if (prof < 1) return null;
  const f = CHAO + prof;
  return (
    <g opacity={o}>
      <P p={`${x + 24},798 ${x + w - 24},798 ${x + w},${CHAO} ${x},${CHAO}`} f="#2E1B0E" />
      <rect x={x} y={CHAO} width={w} height={prof} fill="#3D2513" />
      <P p={`${x},${CHAO} ${x + 26},${CHAO} ${x + 26},${f - 18} ${x},${f}`} f="#553419" />
      <P p={`${x + w},${CHAO} ${x + w - 26},${CHAO} ${x + w - 26},${f - 18} ${x + w},${f}`} f="#4A2C15" />
      <P p={`${x},${f} ${x + 26},${f - 18} ${x + w - 26},${f - 18} ${x + w},${f}`} f="#5E3B1D" />
    </g>
  );
};

export const Monte: React.FC<{ x: number; altura: number }> = ({ x, altura: h }) => {
  if (h < 1) return null;
  const b = 826;
  return (
    <g>
      <P p={`${x},${b} ${x + 30},${b - h * 0.65} ${x + 65},${b - h} ${x + 100},${b - h * 0.55} ${x + 130},${b}`} f="#7A4E24" />
      <P p={`${x + 30},${b - h * 0.65} ${x + 65},${b - h} ${x + 60},${b}`} f="#8E5E2E" />
      <P p={`${x + 65},${b - h} ${x + 100},${b - h * 0.55} ${x + 130},${b} ${x + 60},${b}`} f="#6A4320" />
    </g>
  );
};

export const Pa: React.FC<{ x: number; y: number; rot: number; o: number }> = ({ x, y, rot, o }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={o}>
    <rect x={-6} y={-230} width={12} height={230} fill="#8B5A2B" />
    <rect x={-22} y={-246} width={44} height={14} rx={6} fill="#5C3A1E" />
    <P p="-28,0 28,0 24,44 0,64 -24,44" f="#A0A8B4" />
    <P p="0,0 28,0 24,44 0,64" f="#848C99" />
  </g>
);

export const Balde: React.FC<{ x: number; y: number; rot: number; o: number }> = ({ x, y, rot, o }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={o}>
    <path d="M-50,-50 Q0,-110 50,-50" stroke="#555" strokeWidth={6} fill="none" />
    <P p="-56,-50 56,-50 42,50 -42,50" f="#2A9D8F" />
    <P p="0,-50 56,-50 42,50 0,50" f="#21867A" />
    <rect x={-60} y={-58} width={120} height={14} rx={6} fill="#1B6F65" />
  </g>
);

export const Torrao: React.FC<{ x: number; y: number; rot: number }> = ({ x, y, rot }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <P p="-12,-4 -4,-12 10,-8 12,6 0,12 -10,8" f="#7A4E24" />
    <P p="-4,-12 10,-8 12,6 0,0" f="#5E3B1D" />
  </g>
);

/* ---------- Chuva, líquidos, bolhas e cheiro ---------- */

export const Chuva: React.FC<{ intensidade: number; t: number }> = ({ intensidade, t }) => {
  if (intensidade <= 0.01) return null;
  return (
    <g opacity={intensidade}>
      <clipPath id="clip-chuva">
        <rect x={-400} y={-700} width={2400} height={700 + CHAO} />
      </clipPath>
      <g clipPath="url(#clip-chuva)">
        {Array.from({ length: 120 }).map((_, i) => {
          const x = random(`cx${i}`) * 1500 - 200;
          const v = 26 + random(`cv${i}`) * 16;
          const y = ((t * v + random(`cy${i}`) * 1300) % 1300) - 420;
          return (
            <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 46} stroke="#D6ECFF" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
          );
        })}
      </g>
      {Array.from({ length: 18 }).map((_, i) => {
        const p = ((t + random(`sp${i}`) * 30) % 30) / 30;
        const x = random(`sx${i}`) * 1100;
        return (
          <ellipse key={i} cx={x} cy={815 + random(`sy${i}`) * 12} rx={4 + p * 16} ry={2 + p * 4} fill="none" stroke="#D6ECFF" strokeWidth={2} opacity={1 - p} />
        );
      })}
    </g>
  );
};

// Superfície com leve ondulação e facetas
export const Liquido: React.FC<{ x: number; w: number; topo: number; fundo: number; cor: string; t: number; onda?: number; o?: number }> = ({
  x,
  w,
  topo,
  fundo,
  cor,
  t,
  onda = 4,
  o = 1,
}) => {
  if (fundo - topo < 1) return null;
  const pontos: string[] = [];
  for (let xi = 0; xi <= w; xi += 20) {
    pontos.push(`${x + xi},${topo + Math.sin(xi * 0.05 + t * 0.15) * onda}`);
  }
  pontos.push(`${x + w},${fundo}`, `${x},${fundo}`);
  return (
    <g opacity={o}>
      <polygon points={pontos.join(" ")} fill={cor} />
      {Array.from({ length: 6 }).map((_, i) => {
        const cx = x + random(`lq${i}`) * w;
        const cy = lerp(topo + 20, fundo - 10, random(`lqy${i}`));
        if (cy > fundo - 10) return null;
        return <P key={i} p={`${cx - 40},${cy} ${cx},${cy - 24} ${cx + 50},${cy + 10}`} f="rgba(0,0,0,0.12)" />;
      })}
    </g>
  );
};

export const Bolhas: React.FC<{ x: number; w: number; de: number; ate: number; t: number; n: number; cor: string; o?: number; semente?: string }> = ({
  x,
  w,
  de,
  ate,
  t,
  n,
  cor,
  o = 1,
  semente = "b",
}) => {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {Array.from({ length: n }).map((_, i) => {
        const periodo = 50 + random(`${semente}p${i}`) * 50;
        const p = ((t + random(`${semente}f${i}`) * periodo) % periodo) / periodo;
        const y = lerp(de, ate, p);
        const bx = x + random(`${semente}x${i}`) * w + Math.sin(t * 0.1 + i) * 6;
        const r = 5 + random(`${semente}r${i}`) * 8;
        return <circle key={i} cx={bx} cy={y} r={r} fill={cor} stroke="rgba(255,255,255,0.6)" strokeWidth={2} opacity={Math.sin(p * Math.PI)} />;
      })}
    </g>
  );
};

export const Fedor: React.FC<{ x: number; y: number; t: number; o: number; cor?: string; n?: number; abertura?: number }> = ({
  x,
  y,
  t,
  o,
  cor = "#7A9A2E",
  n = 3,
  abertura = 60,
}) => {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {Array.from({ length: n }).map((_, i) => {
        const p = ((t + i * 17) % 50) / 50;
        const xi = x + (i - (n - 1) / 2) * abertura;
        const yb = y - p * 110;
        return (
          <path
            key={i}
            d={`M${xi},${yb} q16,-18 0,-36 t0,-36`}
            stroke={cor}
            strokeWidth={9}
            strokeLinecap="round"
            fill="none"
            opacity={Math.sin(p * Math.PI)}
          />
        );
      })}
    </g>
  );
};

export const Moscas: React.FC<{ x: number; y: number; t: number; o: number }> = ({ x, y, t, o }) => {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {[0, 1, 2].map((i) => {
        const a = t * (0.12 + i * 0.03) + i * 2;
        const mx = x + Math.cos(a) * (70 + i * 25);
        const my = y + Math.sin(a * 1.3) * 40;
        const asa = Math.abs(Math.sin(t * 1.5 + i)) * 6 + 3;
        return (
          <g key={i} transform={`translate(${mx},${my})`}>
            <ellipse cx={-5} cy={-6} rx={7} ry={asa} fill="rgba(255,255,255,0.8)" />
            <ellipse cx={5} cy={-6} rx={7} ry={asa} fill="rgba(255,255,255,0.8)" />
            <circle r={6} fill="#1B1B1B" />
          </g>
        );
      })}
    </g>
  );
};

/* ---------- Tanque, tampa e campana ---------- */

const { x: TX, y: TY, w: TW, h: TH } = TANQUE;

export const TanqueFundo: React.FC<{ dy?: number }> = ({ dy = 0 }) => (
  <g transform={`translate(0,${dy})`}>
    <rect x={TX + PAREDE} y={TY} width={TW - 2 * PAREDE} height={TH - PAREDE} fill="#2B323C" />
    <P p={`${TX + PAREDE},${TY} ${TX + TW / 2},${TY} ${TX + PAREDE},${TY + 200}`} f="#323A46" />
    <P p={`${TX + TW - PAREDE},${TY + 120} ${TX + TW - PAREDE},${TY + TH - PAREDE} ${TX + TW / 2},${TY + TH - PAREDE}`} f="#262C35" />
  </g>
);

const FACETAS_TANQUE = (() => {
  const xs = [TX, TX + 140, TX + 280, TX + TW];
  const ys = [TY, TY + 150, TY + 310, TY + TH];
  const tons = ["#8D99AE", "#97A3B7", "#7F8BA0", "#A3AEC0"];
  const tris: { p: string; f: string }[] = [];
  let k = 0;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      const [a, b, c, d] = [`${xs[i]},${ys[j]}`, `${xs[i + 1]},${ys[j]}`, `${xs[i + 1]},${ys[j + 1]}`, `${xs[i]},${ys[j + 1]}`];
      tris.push({ p: `${a} ${b} ${c}`, f: tons[k++ % 4] }, { p: `${a} ${c} ${d}`, f: tons[(k + 1) % 4] });
    }
  return tris;
})();

// Paredes do tanque em corte. `frente` (0..1) mostra a face fechada (antes do corte).
export const TanqueParedes: React.FC<{ dy?: number; frente?: number }> = ({ dy = 0, frente = 0 }) => (
  <g transform={`translate(0,${dy})`}>
    <P p={`${TX},${TY} ${TX + PAREDE},${TY} ${TX + PAREDE},${TY + TH} ${TX},${TY + TH}`} f="#8D99AE" />
    <P p={`${TX},${TY} ${TX + PAREDE},${TY} ${TX},${TY + TH * 0.6}`} f="#A3AEC0" />
    <P p={`${TX + TW - PAREDE},${TY} ${TX + TW},${TY} ${TX + TW},${TY + TH} ${TX + TW - PAREDE},${TY + TH}`} f="#7F8BA0" />
    <P p={`${TX},${TY + TH - PAREDE} ${TX + TW},${TY + TH - PAREDE} ${TX + TW},${TY + TH} ${TX},${TY + TH}`} f="#6E7A8F" />
    <rect x={TX - 8} y={TY - 6} width={PAREDE + 16} height={12} rx={4} fill="#6E7A8F" />
    <rect x={TX + TW - PAREDE - 8} y={TY - 6} width={PAREDE + 16} height={12} rx={4} fill="#6E7A8F" />
    {frente > 0.01 && (
      <g opacity={frente}>
        {FACETAS_TANQUE.map((t, i) => (
          <P key={i} p={t.p} f={t.f} />
        ))}
        {[120, 240, 360].map((y) => (
          <rect key={y} x={TX} y={TY + y} width={TW} height={12} fill="#6E7A8F" />
        ))}
      </g>
    )}
  </g>
);

export const Tampa: React.FC<{ ang?: number; dy?: number; o?: number }> = ({ ang = 0, dy = 0, o = 1 }) => {
  if (o <= 0.01) return null;
  const y = TY;
  return (
    <g transform={`translate(0,${dy}) rotate(${ang}, ${TX - 10}, ${y})`} opacity={o}>
      <P p={`${TX - 10},${y - 26} ${TX + TW + 10},${y - 26} ${TX + TW + 10},${y} ${TX - 10},${y}`} f="#5C6675" />
      <P p={`${TX - 10},${y - 26} ${TX + TW / 2},${y - 26} ${TX + TW / 2 - 40},${y} ${TX - 10},${y}`} f="#6B7686" />
      <rect x={TX + TW / 2 - 45} y={y - 44} width={90} height={18} rx={7} fill="#3E4652" />
    </g>
  );
};

// Zona de gás acumulado no topo do tanque (entre a tampa e a lama)
export const ZonaGas: React.FC<{ o: number; t: number }> = ({ o, t }) => {
  if (o <= 0.01) return null;
  return (
    <g>
      <rect x={TX + PAREDE} y={TY} width={TW - 2 * PAREDE} height={LAMA - TY} fill="#A9D6FF" opacity={o} />
      {Array.from({ length: 14 }).map((_, i) => (
        <circle
          key={i}
          cx={TX + 40 + random(`zg${i}`) * (TW - 80) + Math.sin(t * 0.05 + i) * 14}
          cy={TY + 30 + random(`zgy${i}`) * (LAMA - TY - 60) + Math.cos(t * 0.06 + i) * 10}
          r={6 + random(`zgr${i}`) * 6}
          fill="#E8F5FF"
          opacity={o * 0.9}
        />
      ))}
    </g>
  );
};

export const CAMPANA = { x0: 370, x1: 710, alt: 400 };

export const Campana: React.FC<{ topo: number; gas: number; o?: number }> = ({ topo, gas, o = 1 }) => {
  const { x0, x1, alt } = CAMPANA;
  const borda = topo + alt;
  const meio = (x0 + x1) / 2;
  return (
    <g opacity={o}>
      <rect x={x0 + 16} y={topo + 28} width={x1 - x0 - 32} height={Math.max(0, LAMA - topo - 28)} fill="#9AD1FF" opacity={0.2 + 0.45 * gas} />
      <P p={`${x0},${topo + 28} ${x0 + 16},${topo + 28} ${x0 + 16},${borda} ${x0},${borda}`} f="#3A7CA5" />
      <P p={`${x1 - 16},${topo + 28} ${x1},${topo + 28} ${x1},${borda} ${x1 - 16},${borda}`} f="#2C6488" />
      <P p={`${x0},${topo + 30} ${x0 + 50},${topo} ${x1 - 50},${topo} ${x1},${topo + 30}`} f="#3A7CA5" />
      <P p={`${x0},${topo + 30} ${x0 + 50},${topo} ${meio},${topo} ${meio - 40},${topo + 30}`} f="#4F94BF" />
      <rect x={meio - 12} y={topo - 26} width={24} height={28} fill="#555B6E" />
      <rect x={meio - 22} y={topo - 32} width={44} height={10} rx={4} fill="#3D405B" />
    </g>
  );
};

/* ---------- Canos e poço ---------- */

const { x1: EX1, y1: EY1, x2: EX2, y2: EY2 } = ENTRADA;
export const COMPRIMENTO_ENTRADA = Math.hypot(EX2 - EX1, EY2 - EY1);
export const pontoNaEntrada = (p: number): [number, number] => [lerp(EX1, EX2, p), lerp(EY1, EY2, p)];
const P_LAMA = (LAMA - EY1) / (EY2 - EY1);

export const CanoEntrada: React.FC<{ revela: number; destaque?: number }> = ({ revela, destaque = 0 }) => {
  if (revela <= 0) return null;
  const L = COMPRIMENTO_ENTRADA;
  const [lx, ly] = pontoNaEntrada(P_LAMA);
  return (
    <g>
      <line x1={EX1} y1={EY1} x2={EX2} y2={EY2} stroke="#7D8796" strokeWidth={40} strokeDasharray={L} strokeDashoffset={L * (1 - revela)} />
      <line x1={EX1} y1={EY1} x2={EX2} y2={EY2} stroke="#DCE1E8" strokeWidth={26} strokeDasharray={L} strokeDashoffset={L * (1 - revela)} />
      {revela > P_LAMA && (
        <line x1={lx} y1={ly} x2={lerp(lx, EX2, Math.min(1, (revela - P_LAMA) / (1 - P_LAMA)))} y2={lerp(ly, EY2, Math.min(1, (revela - P_LAMA) / (1 - P_LAMA)))} stroke="#4A5D2C" strokeWidth={24} />
      )}
      {destaque > 0 && (
        <line x1={lx} y1={ly} x2={EX2} y2={EY2} stroke="#FFD60A" strokeWidth={50} strokeLinecap="round" opacity={destaque * 0.35} />
      )}
      <g opacity={Math.min(1, revela * 4)}>
        <P p={`${EX1 - 44},${EY1 - 44} ${EX1 + 44},${EY1 - 44} ${EX1 + 16},${EY1} ${EX1 - 16},${EY1}`} f="#AEB6C2" />
        <P p={`${EX1},${EY1 - 44} ${EX1 + 44},${EY1 - 44} ${EX1 + 16},${EY1}`} f="#959DAA" />
      </g>
    </g>
  );
};

const SAIDA = { x1: TX + TW - PAREDE, y1: LAMA + 10, x2: POCO.x + 24, y2: LAMA + 34 };

export const CanoSaida: React.FC<{ revela: number; fluxo: number; t: number }> = ({ revela, fluxo, t }) => {
  if (revela <= 0) return null;
  const L = Math.hypot(SAIDA.x2 - SAIDA.x1, SAIDA.y2 - SAIDA.y1);
  const { x1, y1, x2, y2 } = SAIDA;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7D8796" strokeWidth={34} strokeDasharray={L} strokeDashoffset={L * (1 - revela)} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#DCE1E8" strokeWidth={22} strokeDasharray={L} strokeDashoffset={L * (1 - revela)} />
      {fluxo > 0 && (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4E5A23" strokeWidth={16} strokeDasharray="16 14" strokeDashoffset={-t * 3} opacity={fluxo} />
      )}
    </g>
  );
};

export const Poco: React.FC<{ abre: number; nivel: number; t: number }> = ({ abre, nivel, t }) => {
  const prof = POCO.h * abre;
  if (prof < 1) return null;
  const fundo = CHAO + prof - 18;
  return (
    <g>
      <Buraco x={POCO.x} w={POCO.w} prof={prof} />
      <Liquido x={POCO.x + 26} w={POCO.w - 52} topo={lerp(fundo, CHAO + 300, nivel)} fundo={fundo} cor="#4E5A23" t={t} onda={3} />
    </g>
  );
};

/* ---------- Seres e sinais ---------- */

export const Microbios: React.FC<{ n: number; t: number; o: number; x?: number; w?: number; de?: number; ate?: number }> = ({
  n,
  t,
  o,
  x = TX + 40,
  w = TW - 80,
  de = LAMA + 30,
  ate = TY + TH - 50,
}) => {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {Array.from({ length: n }).map((_, i) => {
        const bx = x + random(`mx${i}`) * w + Math.sin(t * (0.05 + random(`mv${i}`) * 0.05) + i) * 26;
        const by = lerp(de, ate, random(`my${i}`)) + Math.cos(t * 0.07 + i * 1.7) * 14;
        const e = (0.8 + random(`me${i}`) * 0.5) * (1 + Math.sin(t * 0.4 + i) * 0.08);
        const rot = t * 2 + i * 40;
        return (
          <g key={i} transform={`translate(${bx},${by}) rotate(${rot}) scale(${e})`}>
            <path d={`M-14,0 q-8,${Math.sin(t * 0.5 + i) * 6} -16,0`} stroke="#C77DFF" strokeWidth={3} fill="none" />
            <P p="-14,0 -7,-12 7,-12 14,0 7,12 -7,12" f="#9B5DE5" />
            <P p="0,-12 7,-12 14,0 7,12 0,0" f="#7B2CBF" />
            <circle cx={-3} cy={-3} r={2.5} fill="#fff" />
            <circle cx={4} cy={-3} r={2.5} fill="#fff" />
          </g>
        );
      })}
    </g>
  );
};

export const Etiqueta: React.FC<{
  x: number;
  y: number;
  texto: string;
  s: number;
  alvo?: [number, number];
  cor?: string;
  corTexto?: string;
  tamanho?: number;
}> = ({ x, y, texto, s, alvo, cor = "#FFD60A", corTexto = "#1B1B1B", tamanho = 38 }) => {
  if (s <= 0.01) return null;
  const largura = texto.length * tamanho * 0.66 + 56;
  const altura = tamanho + 34;
  return (
    <g opacity={Math.min(1, s * 1.5)}>
      {alvo && (
        <>
          <line x1={x} y1={y} x2={alvo[0]} y2={alvo[1]} stroke="#FFFFFF" strokeWidth={5} />
          <circle cx={alvo[0]} cy={alvo[1]} r={11} fill={cor} stroke="#fff" strokeWidth={4} />
        </>
      )}
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <rect x={-largura / 2} y={-altura / 2 + 6} width={largura} height={altura} rx={altura / 2} fill="rgba(0,0,0,0.3)" />
        <rect x={-largura / 2} y={-altura / 2} width={largura} height={altura} rx={altura / 2} fill={cor} stroke="#fff" strokeWidth={5} />
        <text x={0} y={tamanho * 0.36} textAnchor="middle" fontSize={tamanho} fontWeight={900} fill={corTexto} fontFamily={FONTE}>
          {texto}
        </text>
      </g>
    </g>
  );
};

// Ícone "proibido" (círculo vermelho com risco) sobre um desenho
export const Proibido: React.FC<{ x: number; y: number; s: number; children: React.ReactNode }> = ({ x, y, s, children }) => {
  if (s <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle r={58} fill="#FFFFFF" stroke="#1B1B1B" strokeWidth={4} />
      {children}
      <circle r={50} fill="none" stroke="#E63946" strokeWidth={10} />
      <line x1={-35} y1={35} x2={35} y2={-35} stroke="#E63946" strokeWidth={10} strokeLinecap="round" />
    </g>
  );
};

export const Cadeado: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => {
  if (s <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-24,-10 V-30 a24,24 0 0 1 48,0 V-10" stroke="#C9CED6" strokeWidth={12} fill="none" />
      <P p="-38,-12 38,-12 38,40 -38,40" f="#FFC300" />
      <P p="0,-12 38,-12 38,40 0,40" f="#E0A800" />
      <circle cx={0} cy={10} r={7} fill="#5C3A1E" />
      <rect x={-3} y={10} width={6} height={16} fill="#5C3A1E" />
    </g>
  );
};

export const Broto: React.FC<{ x: number; y: number; s: number; tipo?: number }> = ({ x, y, s, tipo = 0 }) => {
  if (s <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-3} y={-34} width={6} height={34} fill="#3E8E41" />
      {tipo === 0 ? (
        <>
          <P p="0,-30 -30,-50 -10,-24" f="#7FD06B" />
          <P p="0,-34 28,-56 10,-26" f="#5AA84A" />
          <P p="0,-34 -6,-70 8,-40" f="#6BBF59" />
        </>
      ) : (
        <>
          <P p="-26,-24 -16,-44 0,-50 16,-44 26,-24 0,-14" f="#7BC950" />
          <P p="0,-50 16,-44 26,-24 0,-14" f="#5EA83A" />
        </>
      )}
    </g>
  );
};

export const Chama: React.FC<{ x: number; y: number; t: number; s: number }> = ({ x, y, t, s }) => {
  if (s <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {[-24, -12, 0, 12, 24].map((dx, i) => {
        const h = 22 + Math.sin(t * 0.9 + i * 1.7) * 7 + (i === 2 ? 8 : 0);
        return (
          <g key={dx}>
            <P p={`${dx - 7},0 ${dx + 7},0 ${dx},${-h}`} f="#4CC9F0" />
            <P p={`${dx - 3},${-h * 0.45} ${dx + 3},${-h * 0.45} ${dx},${-h}`} f="#FFB703" />
          </g>
        );
      })}
    </g>
  );
};

export const Vapor: React.FC<{ x: number; y: number; t: number; o: number }> = ({ x, y, t, o }) => (
  <Fedor x={x} y={y} t={t} o={o} cor="rgba(255,255,255,0.85)" n={3} abertura={26} />
);
