import { useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Bolhas, Chama, Etiqueta, TanqueParedes, Tampa, ZonaGas } from "../cenario/Pecas";
import { FONTE, ip, LAMA, mola, TANQUE, useCena } from "../util";
import { InteriorTanque } from "./Interior";

const arco = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const ponto = (a: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const [x0, y0] = ponto(a0);
  const [x1, y1] = ponto(a1);
  const grande = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${grande} 1 ${x1},${y1} Z`;
};

// Cena 4: o gás acumula no topo do tanque e o balão explica a composição.
export const Cena4: React.FC = () => {
  const { frame, global, deixa } = useCena();
  const { fps } = useVideoConfig();

  const gas = ip(frame, [0, 130], [0.12, 0.62]);
  const rotulo = mola(frame, deixa("biogás"), fps);
  const balao = mola(frame, deixa("mais"), fps, 14);
  const pizza = ip(frame, [deixa("metade"), deixa("metade") + 30], [0, 0.6]);
  const linha2 = ip(frame, [deixa("metano") + 4, deixa("metano") + 16], [0, 1]);
  const encanado = mola(frame, deixa("mesmo"), fps);

  return (
    <Palco>
      <InteriorTanque t={global} />
      <ZonaGas o={gas} t={global} />
      <Bolhas x={TANQUE.x + 40} w={TANQUE.w - 80} de={LAMA + 140} ate={LAMA - 4} t={frame} n={16} cor="rgba(169,214,255,0.7)" semente="b4" />
      <TanqueParedes />
      <Tampa />
      <Etiqueta x={540} y={975} texto="BIOGÁS" s={rotulo} cor="#4EA8DE" corTexto="#FFFFFF" tamanho={52} />

      {balao > 0.01 && (
        <g transform={`translate(540,640) scale(${balao}) translate(-540,-640)`}>
          <P_balao />
          <path d={arco(240, 470, 110, 0, Math.PI * 2 - 0.001)} fill="#8D99AE" />
          {pizza > 0 && <path d={arco(240, 470, 110, 0, pizza * Math.PI * 2)} fill="#4EA8DE" />}
          <circle cx={240} cy={470} r={44} fill="#FFFFFF" />
          <text x={240} y={484} textAnchor="middle" fontFamily={FONTE} fontWeight={900} fontSize={38} fill="#1D3557">
            {Math.round(pizza * 100)}%
          </text>
          <text x={395} y={430} fontFamily={FONTE} fontWeight={900} fontSize={54} fill="#1D3557">
            ≈ 60% METANO
          </text>
          <g opacity={linha2}>
            <rect x={395} y={462} width={30} height={30} rx={6} fill="#8D99AE" />
            <text x={440} y={489} fontFamily={FONTE} fontWeight={700} fontSize={38} fill="#457B9D">
              resto: gás carbônico
            </text>
          </g>
          <g opacity={Math.min(1, encanado)}>
            <Chama x={410} y={575} t={frame} s={encanado * 1.3} />
            <text x={455} y={562} fontFamily={FONTE} fontWeight={800} fontSize={38} fill="#E76F51">
              = gás encanado
            </text>
          </g>
        </g>
      )}
    </Palco>
  );
};

const P_balao: React.FC = () => (
  <g>
    <rect x={88} y={334} width={904} height={300} rx={44} fill="rgba(0,0,0,0.25)" transform="translate(0,10)" />
    <polygon points="500,620 600,620 545,850" fill="#FFFFFF" stroke="#1D3557" strokeWidth={6} strokeLinejoin="round" />
    <rect x={88} y={334} width={904} height={300} rx={44} fill="#FFFFFF" stroke="#1D3557" strokeWidth={6} />
    <rect x={494} y={612} width={112} height={18} fill="#FFFFFF" />
  </g>
);
