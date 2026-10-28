import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cena1 } from "./cenas/Cena1";
import { Cena2 } from "./cenas/Cena2";
import { Cena3 } from "./cenas/Cena3";
import { Cena4 } from "./cenas/Cena4";
import { Cena5 } from "./cenas/Cena5";
import { Cena6 } from "./cenas/Cena6";
import { Cena7 } from "./cenas/Cena7";
import { Cena8 } from "./cenas/Cena8";
import { Legenda } from "./Legenda";
import { CENAS, DURACAO_TOTAL, inicioDaCena } from "./roteiro";
import { CenaContext, FONTE, useCena } from "./util";

const VISUAIS: Record<number, React.FC> = {
  1: Cena1,
  2: Cena2,
  3: Cena3,
  4: Cena4,
  5: Cena5,
  6: Cena6,
  7: Cena7,
  8: Cena8,
};

const Capitulo: React.FC = () => {
  const { frame, numero, titulo } = useCena();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${(1 - entrada) * -40}px)`,
        opacity: entrada,
      }}
    >
      <div
        style={{
          fontFamily: FONTE,
          fontWeight: 800,
          fontSize: 34,
          color: "#FFFFFF",
          background: "rgba(11,13,23,0.72)",
          border: "3px solid rgba(255,255,255,0.85)",
          borderRadius: 999,
          padding: "12px 30px",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <span style={{ color: "#FFD60A" }}>
          {numero}/{CENAS.length}
        </span>
        <span>{titulo}</span>
      </div>
    </div>
  );
};

const Progresso: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "rgba(0,0,0,0.3)" }}>
      <div style={{ width: `${(frame / DURACAO_TOTAL) * 100}%`, height: "100%", background: "#FFD60A" }} />
    </div>
  );
};

// Tutorial vertical: como funciona um biodigestor caseiro (8 cenas, 1:22)
export const Biodigestor: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0B0D17" }}>
    {CENAS.map((cena) => {
      const Visual = VISUAIS[cena.numero];
      const inicio = inicioDaCena(cena.numero);
      return (
        <Sequence key={cena.numero} from={inicio} durationInFrames={cena.duracao} name={`Cena ${cena.numero}: ${cena.titulo}`}>
          <CenaContext.Provider value={{ ...cena, inicio }}>
            <Visual />
            <Legenda />
            <Capitulo />
          </CenaContext.Provider>
        </Sequence>
      );
    })}
    <Progresso />
  </AbsoluteFill>
);
