import { P } from "./Pecas";

export type Humor = "normal" | "triste" | "feliz";

// Anão de jardim low poly. (x, y) é o ponto entre os pés.
export const Anao: React.FC<{ x: number; y: number; humor: Humor; pulo?: number; t: number }> = ({
  x,
  y,
  humor,
  pulo = 0,
  t,
}) => {
  const respiro = Math.sin(t * 0.08) * 1.5;
  const sombra = 1 - Math.min(pulo, 60) / 120;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={56 * sombra} ry={10 * sombra} fill="rgba(0,0,0,0.25)" />
      <g transform={`translate(${x},${y - pulo}) scale(1.25)`}>
        {/* botas */}
        <P p="-30,0 -30,-14 -6,-14 -4,0" f="#3B2A1A" />
        <P p="6,0 6,-14 30,-14 32,0" f="#2E2014" />
        <g transform={`translate(0,${respiro})`}>
          {/* corpo */}
          <P p="-34,-14 34,-14 26,-78 -26,-78" f="#2E86AB" />
          <P p="-34,-14 0,-14 0,-78 -26,-78" f="#3C9DC4" />
          <rect x={-33} y={-42} width={66} height={9} fill="#3B2A1A" />
          <rect x={-7} y={-44} width={14} height={13} fill="#FFC300" />
          {/* braços */}
          <P p="-26,-74 -46,-40 -36,-34 -20,-60" f="#246E8C" />
          <P p="26,-74 46,-40 36,-34 20,-60" f="#246E8C" />
          <circle cx={-41} cy={-35} r={7} fill="#F5C9A6" />
          <circle cx={41} cy={-35} r={7} fill="#F5C9A6" />
          {/* barba */}
          <P p="-26,-98 26,-98 18,-60 0,-40 -18,-60" f="#F4F4F4" />
          <P p="-26,-98 0,-98 0,-40 -18,-60" f="#DCDCDC" />
          {/* rosto */}
          <P p="-22,-122 22,-122 26,-98 -26,-98" f="#F5C9A6" />
          <P p="0,-122 22,-122 26,-98 0,-98" f="#EBB894" />
          <circle cx={0} cy={-101} r={7} fill="#E8927C" />
          {humor === "feliz" ? (
            <>
              <path d="M-15,-109 Q-10,-116 -5,-109" stroke="#2B2B2B" strokeWidth={3} fill="none" />
              <path d="M5,-109 Q10,-116 15,-109" stroke="#2B2B2B" strokeWidth={3} fill="none" />
              <circle cx={-17} cy={-102} r={4} fill="#F28482" opacity={0.7} />
              <circle cx={17} cy={-102} r={4} fill="#F28482" opacity={0.7} />
            </>
          ) : (
            <>
              <circle cx={-10} cy={-110} r={3.2} fill="#2B2B2B" />
              <circle cx={10} cy={-110} r={3.2} fill="#2B2B2B" />
              {humor === "triste" && (
                <>
                  <path d="M-16,-118 L-5,-114" stroke="#2B2B2B" strokeWidth={3} />
                  <path d="M16,-118 L5,-114" stroke="#2B2B2B" strokeWidth={3} />
                </>
              )}
            </>
          )}
          {/* gorro */}
          <P p="-29,-118 29,-118 0,-206" f="#D7263D" />
          <P p="0,-118 29,-118 0,-206" f="#B01E30" />
          <rect x={-31} y={-126} width={62} height={9} fill="#9E1B2B" />
        </g>
      </g>
    </g>
  );
};
