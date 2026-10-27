import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Vertical: React.FC<{ titulo: string }> = ({ titulo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const escala = spring({ frame, fps, config: { damping: 200 } });
  const opacidade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <h1
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 110,
          textAlign: "center",
          opacity: opacidade,
          transform: `scale(${escala})`,
        }}
      >
        {titulo}
      </h1>
    </AbsoluteFill>
  );
};
