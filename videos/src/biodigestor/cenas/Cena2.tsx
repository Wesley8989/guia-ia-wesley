import { interpolateColors } from "remotion";
import { Palco } from "../cenario/Palco";
import { Bolhas, Buraco, Chuva, Fedor, Liquido, Monte, Moscas, Resto } from "../cenario/Pecas";
import { CHAO, ip, useCena } from "../util";
import { BURACO, COR_LAMA, RESTOS_BURACO } from "./comum";

// Cena 2: a chuva enche o buraco e os restos viram uma lama fedida.
export const Cena2: React.FC = () => {
  const { frame, deixa } = useCena();

  const chuva = ip(frame, [0, 20], [0, 1]);
  const fundo = CHAO + BURACO.prof - 18;
  const agua = ip(frame, [deixa("enche") - 6, deixa("enche") + 50], [0, 1]);
  const lama = ip(frame, [deixa("vira"), deixa("vira") + 35], [0, 1]);
  const fedor = ip(frame, [deixa("fedida"), deixa("fedida") + 15], [0, 1]);
  const nivel = fundo - agua * 190;
  const cor = interpolateColors(lama, [0, 1], ["rgba(93,173,226,0.78)", COR_LAMA]);

  return (
    <Palco escuro={chuva} humor="triste" frente={<Chuva intensidade={chuva} t={frame} />}>
      <Monte x={720} altura={80} />
      <Buraco x={BURACO.x} w={BURACO.w} prof={BURACO.prof} />
      {RESTOS_BURACO.map((r, i) => (
        <Resto
          key={i}
          tipo={r.tipo}
          x={r.x + Math.sin(frame * 0.08 + i) * 4 * agua}
          y={Math.min(r.y, nivel + 10 + i * 6) + Math.sin(frame * 0.1 + i) * 3 * agua}
          rot={r.rot + Math.sin(frame * 0.05 + i) * 10 * agua}
          escala={1.25}
          o={1 - lama * 0.85}
        />
      ))}
      <Liquido x={BURACO.x + 26} w={BURACO.w - 52} topo={nivel} fundo={fundo} cor={cor} t={frame} onda={5} />
      <Bolhas x={BURACO.x + 40} w={BURACO.w - 80} de={fundo - 10} ate={nivel} t={frame} n={10} cor="#5C7A3A" o={lama} />
      <Fedor x={540} y={nivel - 30} t={frame} o={fedor} n={4} abertura={70} />
      <Moscas x={540} y={nivel - 120} t={frame} o={fedor} />
    </Palco>
  );
};
