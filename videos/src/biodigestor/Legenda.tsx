import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { paginar } from "./legendas";
import { FONTE, useCena } from "./util";

// Legenda central com destaque palavra a palavra (estilo Reels/TikTok).
export const Legenda: React.FC = () => {
  const { frame, palavras } = useCena();
  const { fps } = useVideoConfig();
  const paginas = paginar(palavras);

  const indice = paginas.findIndex((pg, i) => {
    const proxima = paginas[i + 1];
    return frame >= pg[0].inicio && (!proxima || frame < proxima[0].inicio);
  });
  if (indice === -1) return null;
  const pagina = paginas[indice];

  const entrada = spring({
    frame: frame - pagina[0].inicio,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 620,
          background: "linear-gradient(to bottom, rgba(10,12,20,0) 0%, rgba(10,12,20,0.55) 45%, rgba(10,12,20,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1430,
          left: 60,
          right: 60,
          height: 380,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          gap: "6px 30px",
          transform: `scale(${interpolate(entrada, [0, 1], [0.85, 1])})`,
          opacity: entrada,
        }}
      >
        {pagina.map((p) => {
          const ativa = frame >= p.inicio && frame < p.fim;
          const dita = frame >= p.fim;
          const pulo = spring({
            frame: frame - p.inicio,
            fps,
            config: { damping: 10, stiffness: 260 },
          });
          const escala = ativa ? interpolate(pulo, [0, 1], [1, 1.08]) : 1;
          return (
            <span
              key={`${p.inicio}-${p.palavra}`}
              style={{
                fontFamily: FONTE,
                fontWeight: 900,
                fontSize: 82,
                lineHeight: 1.15,
                color: ativa ? "#FFD60A" : "#FFFFFF",
                opacity: ativa || dita ? 1 : 0.5,
                WebkitTextStroke: "14px #0B0D17",
                paintOrder: "stroke fill",
                textShadow: "0 8px 0 rgba(0,0,0,0.35)",
                transform: `scale(${escala}) translateY(${ativa ? -6 * pulo : 0}px)`,
                display: "inline-block",
              }}
            >
              {p.palavra}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
