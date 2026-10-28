import { Easing, useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Balde, Buraco, Monte, Pa, Resto, Torrao } from "../cenario/Pecas";
import { CHAO, ip, lerp, mola, useCena } from "../util";
import { BURACO, RESTOS_BURACO } from "./comum";

// Cena 1: cava-se um buraco no quintal e jogam-se os restos da cozinha.
export const Cena1: React.FC = () => {
  const { frame, deixa } = useCena();
  const { fps } = useVideoConfig();

  const inicioCavar = deixa("cavar");
  const cavar = ip(frame, [inicioCavar, inicioCavar + 38], [0, 1], Easing.inOut(Easing.quad));
  const inicioRestos = Math.max(deixa("jogar"), inicioCavar + 40);
  const balde = mola(frame, inicioRestos - 12, fps, 14);
  const inclinacao = ip(frame, [inicioRestos - 4, inicioRestos + 6], [0, -110]);
  const saidaBalde = ip(frame, [inicioRestos + 70, inicioRestos + 85], [1, 0]);

  return (
    <Palco>
      <Monte x={720} altura={80 * cavar} />
      <Buraco x={BURACO.x} w={BURACO.w} prof={BURACO.prof * cavar} />
      {Array.from({ length: 8 }).map((_, k) => {
        const s = inicioCavar + 4 + k * 4.5;
        const p = ip(frame, [s, s + 14], [0, 1]);
        if (p <= 0 || p >= 1) return null;
        return <Torrao key={k} x={lerp(540, 790, p)} y={lerp(CHAO + 40, 790, p) - Math.sin(p * Math.PI) * 170} rot={p * 400} />;
      })}
      <Pa
        x={560}
        y={CHAO + BURACO.prof * cavar - 30 + Math.sin(frame * 0.6) * 18}
        rot={Math.sin(frame * 0.6) * 18}
        o={ip(frame, [inicioCavar - 4, inicioCavar], [0, 1]) * ip(frame, [inicioCavar + 38, inicioCavar + 46], [1, 0])}
      />
      {RESTOS_BURACO.map((r, i) => {
        const s = inicioRestos + 2 + i * 5;
        const p = ip(frame, [s, s + 18], [0, 1]);
        if (p <= 0) return null;
        const quique = frame > s + 18 ? Math.max(0, Math.sin((frame - s - 18) * 0.5) * 8 * Math.exp(-(frame - s - 18) * 0.2)) : 0;
        return (
          <Resto
            key={i}
            tipo={r.tipo}
            x={lerp(600, r.x, p)}
            y={lerp(620, r.y, Easing.in(Easing.quad)(p)) - quique}
            rot={lerp(0, r.rot + 360, p)}
            escala={1.25}
          />
        );
      })}
      <Balde x={lerp(820, 640, balde)} y={lerp(380, 560, balde)} rot={inclinacao} o={Math.min(balde, saidaBalde)} />
    </Palco>
  );
};
