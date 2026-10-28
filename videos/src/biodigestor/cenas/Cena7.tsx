import { Easing, random, useVideoConfig } from "remotion";
import { Etiqueta, Fedor, P } from "../cenario/Pecas";
import { FONTE, H, ip, lerp, mola, useCena, W } from "../util";

const CIL = { x: 330, y: 430, w: 420, h: 800 };
const TUBO_Y_ENTRADA = 1150;
const TUBO_Y_SAIDA = 500;

// Palha de aço: rabiscos cinzentos dentro do cilindro
const PALHA = Array.from({ length: 80 }).map((_, i) => {
  const r = (k: string) => random(`palha${k}${i}`);
  const x = lerp(CIL.x + 40, CIL.x + CIL.w - 40, r("x"));
  const y = lerp(CIL.y + 90, CIL.y + CIL.h - 90, r("y"));
  const d = (k: string) => (r(k) - 0.5) * 120;
  return {
    d: `M${x},${y} q${d("a")},${d("b")} ${d("c")},${d("d")} t${d("e")},${d("f")} t${d("g")},${d("h")}`,
    cor: ["#9AA3AD", "#C9CED6", "#7D8590", "#B8BEC6"][Math.floor(r("cor") * 4)],
    largura: 3 + r("l") * 3,
  };
});

const fundo = Array.from({ length: 60 }).map((_, i) => {
  const x = (i % 6) * 220 - 60, y = Math.floor(i / 6) * 220 - 60;
  const j = (k: string) => (random(`f7${k}${i}`) - 0.5) * 80;
  return { p: `${x + j("a")},${y + j("b")} ${x + 240 + j("c")},${y + j("d")} ${x + j("e")},${y + 240 + j("f")}`, o: random(`f7o${i}`) * 0.08 };
});

const Metano: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[[-48, -40], [48, -40], [-48, 40], [48, 40]].map(([hx, hy]) => (
      <g key={`${hx}${hy}`}>
        <line x1={0} y1={0} x2={hx} y2={hy} stroke="#DDE3EA" strokeWidth={10} />
        <circle cx={hx} cy={hy} r={20} fill="#F1F1F1" stroke="#BFC6CF" strokeWidth={3} />
      </g>
    ))}
    <circle r={34} fill="#3A3A3A" />
    <circle cx={-10} cy={-10} r={10} fill="#5A5A5A" />
  </g>
);

const Sulfidrico: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[[-54, 32], [54, 32]].map(([hx, hy]) => (
      <g key={hx}>
        <line x1={0} y1={0} x2={hx} y2={hy} stroke="#DDE3EA" strokeWidth={10} />
        <circle cx={hx} cy={hy} r={20} fill="#F1F1F1" stroke="#BFC6CF" strokeWidth={3} />
      </g>
    ))}
    <circle r={38} fill="#F4D35E" stroke="#C9A227" strokeWidth={3} />
    <circle cx={-12} cy={-12} r={11} fill="#FBE68A" />
  </g>
);

const Formula: React.FC<{ x: number; y: number; base: string; indice: string; resto?: string; cor: string }> = ({ x, y, base, indice, resto = "", cor }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={FONTE} fontWeight={900} fontSize={60} fill={cor}>
    {base}
    <tspan fontSize={38} dy={14}>
      {indice}
    </tspan>
    <tspan dy={-14}>{resto}</tspan>
  </text>
);

const Cartao: React.FC<{ x: number; y: number; s: number; children: React.ReactNode }> = ({ x, y, s, children }) => {
  if (s <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-200} y={-210} width={400} height={440} rx={40} fill="rgba(0,0,0,0.3)" transform="translate(0,12)" />
      <rect x={-200} y={-210} width={400} height={440} rx={40} fill="#FFFFFF" stroke="#1D3557" strokeWidth={6} />
      {children}
    </g>
  );
};

// Cena 7: zoom no filtro de palha de aço que retém o gás sulfídrico (H₂S).
export const Cena7: React.FC = () => {
  const { frame, deixa, duracao } = useCena();
  const { fps } = useVideoConfig();

  const zoom = ip(frame, [0, 30], [0.45, 1], Easing.out(Easing.cubic));
  const tMetano = deixa("metano");
  const tNao = deixa("não");
  const tSemCheiro = deixa("cheiro");
  const tOvo = deixa("ovo");
  const tSulf = deixa("sulfídrico");
  const tVoce = deixa("você");
  const tPalha = deixa("palha");

  const fimCartoes = ip(frame, [tVoce, tVoce + 15], [1, 0]);
  const cartaoMetano = mola(frame, tMetano, fps) * fimCartoes;
  const cartaoH2S = mola(frame, tOvo, fps) * fimCartoes;
  const fedorMetano = ip(frame, [deixa("fede"), deixa("fede") + 8], [0, 1]) * ip(frame, [tSemCheiro, tSemCheiro + 15], [1, 0]);
  const xis = mola(frame, tNao, fps) * ip(frame, [tSemCheiro + 15, tSemCheiro + 25], [1, 0]);
  const semCheiro = mola(frame, tSemCheiro + 6, fps);
  const apagado = Math.min(1, cartaoMetano + cartaoH2S) * 0.6;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="fundo7" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F6F78" />
          <stop offset="1" stopColor="#0E2A30" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#fundo7)" />
      {fundo.map((t, i) => (
        <polygon key={i} points={t.p} fill="#FFFFFF" opacity={t.o} />
      ))}

      <g transform={`translate(540,830) scale(${zoom}) translate(-540,-830)`} opacity={ip(frame, [0, 12], [0, 1])}>
        <g opacity={1 - apagado}>
          {/* tubo amarelo de entrada e saída */}
          {[TUBO_Y_ENTRADA, TUBO_Y_SAIDA].map((y, i) => {
            const [x1, x2] = i === 0 ? [-60, CIL.x + 10] : [CIL.x + CIL.w - 10, W + 60];
            return (
              <g key={y}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="#C99700" strokeWidth={64} />
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="#FFC300" strokeWidth={50} />
                <line x1={x1} y1={y - 12} x2={x2} y2={y - 12} stroke="#FFE27A" strokeWidth={8} />
              </g>
            );
          })}
          {/* cilindro transparente */}
          <rect x={CIL.x} y={CIL.y} width={CIL.w} height={CIL.h} rx={30} fill="rgba(190,225,255,0.14)" />
          {PALHA.map((p, i) => (
            <path key={i} d={p.d} stroke={p.cor} strokeWidth={p.largura} fill="none" strokeLinecap="round" />
          ))}
          <Particulas inicio={tVoce - 60} duracao={duracao} />
          <rect x={CIL.x + 34} y={CIL.y + 60} width={26} height={CIL.h - 120} rx={13} fill="#FFFFFF" opacity={0.28} />
          <rect x={CIL.x} y={CIL.y} width={CIL.w} height={CIL.h} rx={30} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={6} />
          {/* tampas metálicas */}
          {[CIL.y - 20, CIL.y + CIL.h - 30].map((y) => (
            <g key={y}>
              <P p={`${CIL.x - 20},${y} ${CIL.x + CIL.w + 20},${y} ${CIL.x + CIL.w + 10},${y + 50} ${CIL.x - 10},${y + 50}`} f="#7D8796" />
              <P p={`${CIL.x - 20},${y} ${540},${y} ${520},${y + 50} ${CIL.x - 10},${y + 50}`} f="#959DAA" />
            </g>
          ))}
        </g>
      </g>

      <Etiqueta x={540} y={250} texto="FILTRO DE GÁS" s={mola(frame, 8, fps)} cor="#FFC300" tamanho={46} />
      <Etiqueta x={400} y={350} texto="PALHA DE AÇO" s={mola(frame, tPalha, fps)} cor="#C9CED6" alvo={[480, 720]} />

      <Cartao x={290} y={820} s={cartaoMetano}>
        <Metano x={0} y={-60} s={1.2} />
        <Formula x={0} y={100} base="CH" indice="4" cor="#1D3557" />
        <text x={0} y={160} textAnchor="middle" fontFamily={FONTE} fontWeight={800} fontSize={38} fill="#457B9D">
          metano
        </text>
        <Fedor x={0} y={-150} t={frame} o={fedorMetano} n={3} abertura={50} />
        {xis > 0.01 && (
          <g transform={`translate(0,-190) scale(${xis})`}>
            <line x1={-60} y1={-60} x2={60} y2={60} stroke="#E63946" strokeWidth={22} strokeLinecap="round" />
            <line x1={60} y1={-60} x2={-60} y2={60} stroke="#E63946" strokeWidth={22} strokeLinecap="round" />
          </g>
        )}
      </Cartao>
      {cartaoMetano > 0.01 && (
        <Etiqueta x={290} y={1095} texto="SEM CHEIRO" s={semCheiro * fimCartoes} cor="#2DC653" corTexto="#FFFFFF" tamanho={40} />
      )}

      <Cartao x={790} y={820} s={cartaoH2S}>
        <Sulfidrico x={0} y={-50} s={1.2} />
        <Formula x={0} y={100} base="H" indice="2" resto="S" cor="#1D3557" />
        <text x={0} y={160} textAnchor="middle" fontFamily={FONTE} fontWeight={800} fontSize={34} fill="#9C6644" opacity={ip(frame, [tSulf, tSulf + 8], [0, 1])}>
          gás sulfídrico
        </text>
        <Fedor x={0} y={-150} t={frame} o={1} n={3} abertura={50} cor="#9ACD32" />
      </Cartao>
      {cartaoH2S > 0.01 && (
        <Etiqueta x={790} y={1095} texto="OVO PODRE" s={mola(frame, tOvo + 6, fps) * fimCartoes} cor="#9ACD32" tamanho={40} />
      )}
    </svg>
  );
};

// Moléculas passando pelo filtro. O H₂S que entra depois da explicação fica preso na palha e enferruja.
const Particulas: React.FC<{ inicio: number; duracao: number }> = ({ inicio, duracao }) => {
  const { frame } = useCena();
  const VIDA = 120;
  const total = Math.ceil((duracao - inicio) / 6);
  return (
    <g>
      {Array.from({ length: total }).map((_, i) => {
        const s = inicio + i * 6;
        const p = (frame - s) / VIDA;
        const h2s = random(`tipo${i}`) < 0.35;
        const yCaptura = lerp(1080, 600, random(`cap${i}`));
        const xCol = lerp(CIL.x + 60, CIL.x + CIL.w - 60, random(`col${i}`));
        const pegou = h2s && s >= inicio + 60; // só as que entram depois da explicação ficam presas
        const qCaptura = (TUBO_Y_ENTRADA - 20 - yCaptura) / (TUBO_Y_ENTRADA - 20 - (TUBO_Y_SAIDA + 20));
        const tCaptura = s + VIDA * (0.18 + qCaptura * 0.67);

        if (pegou && frame >= tCaptura) {
          const o = ip(frame, [tCaptura, tCaptura + 20], [0, 1]);
          const x = xCol + Math.sin(qCaptura * 12 + i) * 40;
          return (
            <g key={i} opacity={o}>
              <P p={`${x - 16},${yCaptura} ${x - 4},${yCaptura - 14} ${x + 14},${yCaptura - 6} ${x + 12},${yCaptura + 12} ${x - 8},${yCaptura + 14}`} f="#B5651D" />
              <Sulfidrico x={x} y={yCaptura} s={0.28 * (1 - o * 0.4)} />
            </g>
          );
        }
        if (p <= 0 || p >= 1) return null;

        let x: number, y: number;
        if (p < 0.18) {
          const q = p / 0.18;
          x = lerp(-40, CIL.x + 50, q);
          y = TUBO_Y_ENTRADA;
        } else if (p < 0.85) {
          const q = (p - 0.18) / 0.67;
          y = lerp(TUBO_Y_ENTRADA - 20, TUBO_Y_SAIDA + 20, q);
          x = lerp(CIL.x + 50, xCol, Math.min(1, q * 3)) + Math.sin(q * 12 + i) * 40 * Math.min(1, q * 3);
          x = lerp(x, CIL.x + CIL.w - 40, Math.max(0, (q - 0.85) / 0.15));
        } else {
          const q = (p - 0.85) / 0.15;
          x = lerp(CIL.x + CIL.w - 40, W + 60, q);
          y = TUBO_Y_SAIDA;
        }
        return h2s ? <Sulfidrico key={i} x={x} y={y} s={0.28} /> : <Metano key={i} x={x} y={y} s={0.28} />;
      })}
    </g>
  );
};
