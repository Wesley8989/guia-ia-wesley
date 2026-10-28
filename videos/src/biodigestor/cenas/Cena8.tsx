import { Easing, random, useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Broto, Campana, CanoEntrada, CanoSaida, Chama, Etiqueta, P, Poco, TanqueParedes, Vapor } from "../cenario/Pecas";
import { CHAO, H, ip, lerp, mola, useCena, W } from "../util";
import { TOPO_CAMPANA_CHEIA } from "./Cena6";
import { InteriorTanque } from "./Interior";

const CORES_CONFETE = ["#FFD60A", "#E63946", "#4EA8DE", "#2DC653", "#9B5DE5", "#FF9F1C"];

const Mesa: React.FC = () => (
  <g>
    <rect x={1130} y={660} width={20} height={170} fill="#7A4E24" />
    <rect x={1460} y={660} width={20} height={170} fill="#6A4320" />
    <P p="1124,616 1486,616 1500,640 1110,640" f="#D49A6A" />
    <P p="1124,616 1300,616 1290,640 1110,640" f="#DFA97B" />
    <rect x={1110} y={640} width={390} height={22} fill="#A0693A" />
  </g>
);

const Fogao: React.FC = () => (
  <g>
    <P p="1170,585 1360,585 1370,600 1160,600" f="#555B7A" />
    <P p="1160,600 1370,600 1370,640 1160,640" f="#3D405B" />
    <P p="1160,600 1260,600 1250,640 1160,640" f="#474B6B" />
    <circle cx={1195} cy={620} r={9} fill="#E0E0E0" />
    <circle cx={1335} cy={620} r={9} fill="#E0E0E0" />
    {[1215, 1315].map((x) => (
      <rect key={x} x={x - 34} y={580} width={68} height={6} rx={3} fill="#22242F" />
    ))}
  </g>
);

const Panela: React.FC<{ dy: number; t: number; vapor: number }> = ({ dy, t, vapor }) => (
  <g transform={`translate(0,${dy})`}>
    <Vapor x={1216} y={490} t={t} o={vapor} />
    <rect x={1158} y={520} width={14} height={10} rx={4} fill="#495057" />
    <rect x={1260} y={520} width={14} height={10} rx={4} fill="#495057" />
    <P p="1170,505 1262,505 1256,578 1176,578" f="#ADB5BD" />
    <P p="1216,505 1262,505 1256,578 1216,578" f="#8E979F" />
    <P p="1166,498 1266,498 1262,508 1170,508" f="#CED4DA" />
    <P p="1174,500 1258,500 1254,506 1178,506" f="#4EA8DE" />
  </g>
);

const Frigideira: React.FC<{ s: number; ovo: number }> = ({ s, ovo }) => (
  <g transform={`translate(1316,580) scale(${s}) translate(-1316,-580)`}>
    <rect x={1356} y={570} width={74} height={8} rx={4} fill="#6B4226" />
    <P p="1272,566 1362,566 1354,582 1280,582" f="#2B2D42" />
    <P p="1316,566 1362,566 1354,582 1316,582" f="#22243A" />
    <g transform={`translate(1316,562) scale(${ovo})`}>
      <P p="-22,4 -18,-5 -6,-9 10,-8 22,-3 18,5 0,7" f="#FFFFFF" />
      <circle cx={0} cy={-2} r={7.5} fill="#FFB703" />
    </g>
  </g>
);

const Feijao: React.FC<{ dy: number; t: number; vapor: number }> = ({ dy, t, vapor }) => (
  <g transform={`translate(0,${dy})`}>
    <Vapor x={1435} y={548} t={t + 20} o={vapor} />
    <P p="1393,560 1477,560 1468,614 1402,614" f="#8D5524" />
    <P p="1435,560 1477,560 1468,614 1435,614" f="#76461D" />
    <P p="1389,554 1481,554 1477,563 1393,563" f="#A0632D" />
    <P p="1396,556 1474,556 1471,561 1399,561" f="#3B1F14" />
    {[1410, 1425, 1445, 1460].map((x, i) => (
      <ellipse key={x} cx={x} cy={557 + (i % 2)} rx={5} ry={3} fill="#5C2E1E" />
    ))}
  </g>
);

const Coracao: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) =>
  s > 0.01 ? (
    <g transform={`translate(${x},${y}) scale(${s * 1.6})`}>
      <path d="M0,10 C-30,-15 -15,-40 0,-22 C15,-40 30,-15 0,10Z" fill="#E63946" stroke="#FFFFFF" strokeWidth={3} />
    </g>
  ) : null;

// Filtro pequeno na linha de gás (o mesmo da cena 7, visto de longe)
const FiltroPequeno: React.FC = () => (
  <g>
    <rect x={816} y={600} width={8} height={190} fill="#7D8796" />
    <rect x={790} y={520} width={60} height={82} rx={8} fill="rgba(190,225,255,0.45)" stroke="#FFFFFF" strokeWidth={3} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${798 + i * 6},${540 + i * 12} q14,-10 22,4 t20,0`} stroke="#9AA3AD" strokeWidth={3} fill="none" />
    ))}
    <rect x={784} y={514} width={72} height={12} rx={4} fill="#7D8796" />
    <rect x={784} y={596} width={72} height={12} rx={4} fill="#7D8796" />
  </g>
);

// Enquadramentos da câmera: o ponto `foco` do mundo aparece no ponto `tela`.
type Plano = { escala: number; foco: [number, number]; tela: [number, number] };
const PLANO_INICIAL: Plano = { escala: 1, foco: [540, CHAO], tela: [540, CHAO] };
const PLANO_GERAL: Plano = { escala: 0.7, foco: [771, CHAO], tela: [540, CHAO] };
const PLANO_FOGAO: Plano = { escala: 1.35, foco: [1310, 580], tela: [540, 820] };

const misturar = (a: Plano, b: Plano, t: number): Plano => ({
  escala: lerp(a.escala, b.escala, t),
  foco: [lerp(a.foco[0], b.foco[0], t), lerp(a.foco[1], b.foco[1], t)],
  tela: [lerp(a.tela[0], b.tela[0], t), lerp(a.tela[1], b.tela[1], t)],
});

const camera = (p: Plano) => ({ escala: p.escala, tx: p.tela[0] - p.foco[0] * p.escala, ty: p.tela[1] - p.foco[1] * p.escala });

// Cena 8: o gás vai por um cano até o fogão na mesa do quintal.
export const Cena8: React.FC = () => {
  const { frame, global, deixa } = useCena();
  const { fps } = useVideoConfig();

  const topo = TOPO_CAMPANA_CHEIA + Math.sin(global * 0.08) * 4;
  const tCano = deixa("cano");
  const cano = ip(frame, [tCano, tCano + 35], [0, 1], Easing.inOut(Easing.quad));
  const tFogao = deixa("fogão");
  const fogo = mola(frame, tFogao, fps, 10);
  const tPanela = deixa("panela");
  const panela = mola(frame, tPanela, fps, 13);
  const tOvo = deixa("ovo");
  const tFeijao = deixa("feijão");
  const feijao = mola(frame, tFeijao, fps, 13);
  const tParabens = deixa("parabéns");
  const pulo = frame >= tParabens ? Math.abs(Math.sin((frame - tParabens) * 0.22)) * 45 : 0;
  const suave = Easing.inOut(Easing.cubic);
  let plano = misturar(PLANO_INICIAL, PLANO_GERAL, ip(frame, [0, 45], [0, 1], suave));
  plano = misturar(plano, PLANO_FOGAO, ip(frame, [tFogao - 14, tFogao + 10], [0, 1], suave));
  plano = misturar(plano, PLANO_GERAL, ip(frame, [tParabens - 12, tParabens + 14], [0, 1], suave));
  const caminho = `M540,${topo - 30} V560 H1100 V612 H1160`;

  return (
    <>
      <Palco camera={camera(plano)} humor="feliz" pulo={pulo}>
        <InteriorTanque t={global} />
        <TanqueParedes />
        <Campana topo={topo} gas={1} />
        <CanoEntrada revela={1} />
        <Poco abre={1} nivel={1} t={global} />
        <CanoSaida revela={1} fluxo={0.5} t={frame} />
        {[880, 950, 1010].map((x, i) => (
          <Broto key={x} x={x} y={796} s={1} tipo={i % 2} />
        ))}

        <Mesa />
        <Fogao />
        <path d={caminho} pathLength={1} stroke="#C99700" strokeWidth={24} fill="none" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - cano} />
        <path d={caminho} pathLength={1} stroke="#FFC300" strokeWidth={16} fill="none" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - cano} />
        {cano >= 1 && (
          <path d={caminho} pathLength={1} stroke="#FFF3B0" strokeWidth={6} fill="none" strokeDasharray="0.015 0.035" strokeDashoffset={-global * 0.004} />
        )}
        <g opacity={ip(frame, [tCano + 10, tCano + 20], [0, 1])}>
          <FiltroPequeno />
        </g>
        <Etiqueta x={820} y={450} texto="FILTRO" s={mola(frame, tCano + 18, fps)} tamanho={30} />
        <Chama x={1215} y={582} t={frame} s={fogo} />
        <Chama x={1315} y={582} t={frame + 7} s={fogo} />
        {panela > 0.01 && <Panela dy={lerp(-700, 0, panela)} t={frame} vapor={ip(frame, [tPanela + 25, tPanela + 45], [0, 1])} />}
        <Frigideira s={mola(frame, tOvo - 8, fps, 12)} ovo={mola(frame, tOvo + 2, fps, 9)} />
        {feijao > 0.01 && <Feijao dy={lerp(-700, 0, feijao)} t={frame} vapor={ip(frame, [tFeijao + 20, tFeijao + 40], [0, 1])} />}
        <Coracao x={1435} y={470 - ip(frame, [deixa("mãe"), deixa("mãe") + 60], [0, 40])} s={mola(frame, deixa("mãe"), fps, 8)} />
      </Palco>

      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {frame >= tParabens &&
          Array.from({ length: 90 }).map((_, i) => {
            const t = frame - tParabens;
            const x = random(`cfx${i}`) * W + Math.sin(t * 0.08 + i) * 30;
            const y = -40 - random(`cfy${i}`) * 500 + t * (6 + random(`cfv${i}`) * 5);
            if (y > H + 40) return null;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={18}
                height={10}
                fill={CORES_CONFETE[i % CORES_CONFETE.length]}
                transform={`rotate(${t * 8 + i * 37}, ${x + 9}, ${y + 5})`}
              />
            );
          })}
        <Etiqueta x={540} y={300} texto="BIODIGESTOR PRONTO!" s={mola(frame, tParabens + 4, fps, 9)} cor="#2DC653" corTexto="#FFFFFF" tamanho={50} />
      </svg>
    </>
  );
};
