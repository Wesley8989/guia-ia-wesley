import { Easing, useVideoConfig } from "remotion";
import { Palco } from "../cenario/Palco";
import { Bolhas, Broto, Campana, CAMPANA, CanoEntrada, CanoSaida, Etiqueta, Poco, TanqueParedes, Tampa, ZonaGas } from "../cenario/Pecas";
import { ENTRADA, ip, LAMA, lerp, mola, POCO, TANQUE, useCena } from "../util";
import { Baforada } from "./Cena5";
import { InteriorTanque } from "./Interior";

export const TOPO_CAMPANA_CHEIA = 700;

// Cena 6: selo d'água, campana flutuante (gasômetro) e saída de biofertilizante.
export const Cena6: React.FC = () => {
  const { frame, global, deixa } = useCena();
  const { fps } = useVideoConfig();

  const tSelo = deixa("selo");
  const tEmpurra = deixa("empurra");
  const tCampana = deixa("campana");
  const tSobe = deixa("sobe");
  const tTransborda = deixa("transborda");

  // tampa: empurrada pelo gás e depois substituída pela campana
  const empurra = ip(frame, [tEmpurra, tEmpurra + 20], [22, 80], Easing.out(Easing.back(2)));
  const tremor = frame > tEmpurra ? Math.sin(frame * 1.4) * 4 : Math.sin(frame * 1.3) * 2.5;
  const voa = ip(frame, [tCampana - 4, tCampana + 22], [0, 1], Easing.in(Easing.quad));
  const gasTampa = ip(frame, [tCampana - 4, tCampana + 20], [0.62, 0]);

  // campana: desce, depois sobe conforme enche de gás
  const desce = mola(frame, tCampana + 6, fps, 15);
  const sobe = ip(frame, [tSobe, tSobe + 55], [0, 1], Easing.inOut(Easing.quad));
  const boia = sobe > 0 ? Math.sin(global * 0.08) * 4 : 0;
  const topo = lerp(-520, TANQUE.y - 10, desce) - sobe * (TANQUE.y - 10 - TOPO_CAMPANA_CHEIA) + boia;

  const selo = mola(frame, tSelo, fps) * ip(frame, [tCampana, tCampana + 12], [1, 0]);
  const destaque = ip(frame, [tSelo, tSelo + 10], [0, 1]) * ip(frame, [tEmpurra + 10, tEmpurra + 25], [1, 0]);
  const poco = ip(frame, [deixa("usada") - 16, deixa("usada") + 6], [0, 1], Easing.out(Easing.quad));
  const saida = ip(frame, [tTransborda, tTransborda + 15], [0, 1]);
  const nivel = ip(frame, [tTransborda + 10, tTransborda + 80], [0, 1]);
  const tHorta = deixa("horta");

  return (
    <Palco>
      <InteriorTanque t={global} />
      <ZonaGas o={gasTampa} t={global} />
      <Bolhas x={TANQUE.x + 40} w={TANQUE.w - 80} de={LAMA + 140} ate={LAMA - 4} t={frame} n={14} cor="rgba(169,214,255,0.7)" semente="b6" />
      <TanqueParedes />
      {desce > 0 && <Campana topo={topo} gas={sobe} />}
      <CanoEntrada revela={1} destaque={destaque} />
      <Tampa dy={-empurra + tremor * (1 - voa) - voa * 900} ang={-voa * 30} o={1 - voa} />
      {[0, 1, 2, 3].map((i) => (
        <Baforada key={i} x={420 + i * 80} y={TANQUE.y - 40} p={ip(frame, [tCampana - 4 + i * 4, tCampana + 40 + i * 4], [0, 1])} />
      ))}

      <Poco abre={poco} nivel={nivel} t={global} />
      <CanoSaida revela={saida} fluxo={nivel > 0 && nivel < 1 ? 1 : nivel >= 1 ? 0.5 : 0} t={frame} />
      {[880, 950, 1010].map((x, i) => (
        <Broto key={x} x={x} y={796} s={mola(frame, tHorta - 6 + i * 5, fps, 10)} tipo={i % 2} />
      ))}

      <Etiqueta x={190} y={1260} texto="SELO D'ÁGUA" s={selo} alvo={[ENTRADA.x2 - 20, ENTRADA.y2 - 40]} />
      <Etiqueta
        x={540}
        y={topo - 100}
        texto="GASÔMETRO"
        s={mola(frame, deixa("gasômetro"), fps)}
        cor="#4EA8DE"
        corTexto="#FFFFFF"
        alvo={[(CAMPANA.x0 + CAMPANA.x1) / 2, topo - 30]}
      />
      <Etiqueta
        x={850}
        y={1340}
        texto="BIOFERTILIZANTE"
        s={mola(frame, deixa("biofertilizante"), fps)}
        cor="#80B918"
        corTexto="#FFFFFF"
        tamanho={36}
        alvo={[POCO.x + POCO.w / 2, 1210]}
      />
    </Palco>
  );
};
