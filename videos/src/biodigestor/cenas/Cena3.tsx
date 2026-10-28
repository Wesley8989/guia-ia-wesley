import { Easing, useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Bolhas, Buraco, Chuva, Liquido, Monte, Proibido, Resto, TanqueParedes, Tampa, ZonaGas } from "../cenario/Pecas";
import { CHAO, ip, LAMA, lerp, mola, TANQUE, useCena } from "../util";
import { BURACO, COR_LAMA, RESTOS_BURACO } from "./comum";
import { InteriorTanque } from "./Interior";

// Cena 3: o buraco é limpo, alargado, e recebe um tanque fechado.
export const Cena3: React.FC = () => {
  const { frame, global, deixa, duracao } = useCena();
  const { fps } = useVideoConfig();

  const chuva = ip(frame, [0, 20], [1, 0]);
  const limpar = ip(frame, [4, 28], [0, 1]);
  const cavar = ip(frame, [22, 56], [0, 1], Easing.inOut(Easing.quad));
  const descida = mola(frame, 56, fps, 16);
  const tTampa = Math.max(deixa("fechado"), 84);
  const tampa = mola(frame, tTampa, fps, 14);
  const icones = mola(frame, deixa("ar"), fps) * ip(frame, [deixa("dentro") + 10, deixa("dentro") + 22], [1, 0]);
  const corte = ip(frame, [deixa("dentro"), deixa("dentro") + 20], [1, 0]);
  const microbios = ip(frame, [deixa("micróbios"), deixa("micróbios") + 20], [0, 1]);
  const gas = ip(frame, [deixa("soltam"), duracao], [0, 0.12]);
  const fundoBuraco = CHAO + BURACO.prof - 18;
  const dy = lerp(-1150, 0, descida);

  return (
    <Palco escuro={chuva} humor={chuva > 0.5 ? "triste" : "normal"} frente={<Chuva intensidade={chuva} t={frame + 150} />}>
      <Monte x={720} altura={lerp(80, 120, cavar) * ip(frame, [110, 150], [1, 0])} />
      <Buraco
        x={lerp(BURACO.x, TANQUE.x, cavar)}
        w={lerp(BURACO.w, TANQUE.w, cavar)}
        prof={lerp(BURACO.prof, TANQUE.h, cavar)}
      />
      {/* lama sendo retirada */}
      {limpar < 1 &&
        RESTOS_BURACO.map((r, i) => <Resto key={i} tipo={r.tipo} x={r.x} y={r.y} rot={r.rot} escala={1.25} o={0.15 * (1 - limpar)} />)}
      <Liquido
        x={BURACO.x + 26}
        w={BURACO.w - 52}
        topo={lerp(fundoBuraco - 190, fundoBuraco, limpar)}
        fundo={fundoBuraco}
        cor={COR_LAMA}
        t={frame}
        o={1 - limpar}
      />
      {descida > 0 && (
        <g>
          <g transform={`translate(0,${dy})`}>
            <InteriorTanque t={global} microbios={microbios} />
            <ZonaGas o={gas} t={global} />
            <Bolhas x={TANQUE.x + 40} w={TANQUE.w - 80} de={LAMA + 120} ate={LAMA - 4} t={frame} n={12} cor="rgba(169,214,255,0.7)" o={gas * 8} semente="b3" />
          </g>
          <TanqueParedes dy={dy} frente={corte} />
        </g>
      )}
      <Tampa dy={lerp(-500, 0, tampa)} o={tampa > 0 ? 1 : 0} />
      <Proibido x={460} y={680} s={icones}>
        {[-14, 4, 22].map((y, i) => (
          <path key={y} d={`M-30,${y - 10} q20,-12 40,0 t${18 - i * 6},-4`} stroke="#5DB7F0" strokeWidth={7} fill="none" strokeLinecap="round" />
        ))}
      </Proibido>
      <Proibido x={620} y={680} s={icones}>
        <path d="M0,-34 C14,-12 22,0 22,12 a22,22 0 0 1 -44,0 C-22,0 -14,-12 0,-34 Z" fill="#4EA8DE" />
      </Proibido>
    </Palco>
  );
};
