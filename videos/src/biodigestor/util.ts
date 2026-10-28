import { createContext, useContext, useMemo } from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { criarDeixa, temporizarPalavras } from "./legendas";
import type { Cena } from "./roteiro";

export const FONTE = "Montserrat, Inter, 'Arial Black', Arial, sans-serif";

// Coordenadas do "mundo" (mesmo tamanho do vídeo quando a câmera está em escala 1)
export const W = 1080;
export const H = 1920;
export const CHAO = 830; // linha do solo (corte)
export const TANQUE = { x: 330, y: 860, w: 420, h: 460 }; // fundo em y = 1320
export const PAREDE = 18;
export const LAMA = 1090; // nível da lama dentro do tanque
export const ENTRADA = { x1: 230, y1: 790, x2: 420, y2: 1230 }; // cano de entrada
export const POCO = { x: 850, w: 180, h: 440 };

export const ip = (
  frame: number,
  entrada: [number, number],
  saida: [number, number],
  easing?: (t: number) => number,
) =>
  interpolate(frame, entrada, saida, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

// Mola de entrada (0 → 1) que começa no frame `inicio`.
export const mola = (frame: number, inicio: number, fps: number, amortecimento = 12) =>
  frame < inicio
    ? 0
    : spring({ frame: frame - inicio, fps, config: { damping: amortecimento, stiffness: 160 } });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type InfoCena = Cena & { inicio: number };

export const CenaContext = createContext<InfoCena | null>(null);

export const useCena = () => {
  const cena = useContext(CenaContext);
  if (!cena) throw new Error("useCena precisa estar dentro de uma cena");
  const frame = useCurrentFrame();
  const palavras = useMemo(
    () => temporizarPalavras(cena.legenda, cena.duracao),
    [cena.legenda, cena.duracao],
  );
  const deixa = useMemo(() => criarDeixa(palavras), [palavras]);
  return { ...cena, frame, global: frame + cena.inicio, palavras, deixa };
};
