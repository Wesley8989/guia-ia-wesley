import type { TipoResto } from "../cenario/Pecas";

// Buraco da composteira (cenas 1 a 3)
export const BURACO = { x: 380, w: 320, prof: 250 };

// Onde cada resto cai no fundo do buraco
export const RESTOS_BURACO: { tipo: TipoResto; x: number; y: number; rot: number }[] = [
  { tipo: "banana", x: 450, y: 1052, rot: -10 },
  { tipo: "maca", x: 520, y: 1056, rot: 15 },
  { tipo: "cenoura", x: 600, y: 1050, rot: 70 },
  { tipo: "alface", x: 650, y: 1056, rot: 0 },
  { tipo: "tomate", x: 420, y: 1030, rot: 0 },
  { tipo: "laranja", x: 560, y: 1030, rot: 160 },
  { tipo: "maca", x: 480, y: 1020, rot: -30 },
  { tipo: "banana", x: 620, y: 1020, rot: 30 },
  { tipo: "alface", x: 540, y: 1000, rot: 20 },
  { tipo: "cenoura", x: 450, y: 995, rot: -60 },
];

// Restos já dentro da lama do tanque (cenas 3 a 8)
export const RESTOS_TANQUE: { tipo: TipoResto; x: number; y: number; rot: number }[] = [
  { tipo: "banana", x: 410, y: 1150, rot: -20 },
  { tipo: "maca", x: 500, y: 1210, rot: 10 },
  { tipo: "cenoura", x: 600, y: 1140, rot: 60 },
  { tipo: "alface", x: 680, y: 1230, rot: 0 },
  { tipo: "tomate", x: 560, y: 1270, rot: 0 },
  { tipo: "laranja", x: 420, y: 1260, rot: 200 },
  { tipo: "banana", x: 650, y: 1180, rot: 40 },
];

export const COR_LAMA = "#4A5D2C";
