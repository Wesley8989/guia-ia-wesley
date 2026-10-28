// Roteiro do vídeo: cada cena tem duração em frames (30fps) e a legenda falada.
export type Cena = {
  numero: number;
  titulo: string;
  duracao: number;
  legenda: string;
};

export const FPS = 30;

export const CENAS: Cena[] = [
  {
    numero: 1,
    titulo: "O problema da composteira aberta",
    duracao: 5 * FPS,
    legenda:
      "Se você cavar um buraco no quintal e jogar lá dentro os restos da cozinha, você tem uma composteira.",
  },
  {
    numero: 2,
    titulo: "A chuva e a lama",
    duracao: 5 * FPS,
    legenda: "Mas a chuva enche o buraco e tudo vira uma lama fedida.",
  },
  {
    numero: 3,
    titulo: "A solução: tanque fechado",
    duracao: 10 * FPS,
    legenda:
      "Então você enterra um tanque fechado, sem entrar ar nem chuva. Lá dentro, sem ar, micróbios comem os restos e soltam um gás.",
  },
  {
    numero: 4,
    titulo: "O biogás e o metano",
    duracao: 10 * FPS,
    legenda:
      "Isso é biogás. E mais da metade dele é metano, o mesmo gás do gás encanado.",
  },
  {
    numero: 5,
    titulo: "O selo d'água e a tampa móvel",
    duracao: 10 * FPS,
    legenda:
      "Mas toda vez que você abre a tampa para pôr mais comida, o gás escapa. Então você coloca um cano de entrada que mergulha abaixo da lama. A comida desce e o gás fica preso.",
  },
  {
    numero: 6,
    titulo: "O gasômetro e o biofertilizante",
    duracao: 12 * FPS,
    legenda:
      "Isso é um selo d'água. Mas o gás acumula e empurra a tampa. Você coloca uma campana que boia na lama e sobe quando enche de gás: um gasômetro. E a lama usada transborda para um poço: biofertilizante, adubo para a horta.",
  },
  {
    numero: 7,
    titulo: "O filtro de gás (cheiro)",
    duracao: 13 * FPS,
    legenda:
      "A maioria acha que é o metano que fede. Não é! O metano não tem cheiro. O cheiro de ovo podre é de outro gás: o gás sulfídrico. Você tira ele passando tudo por palha de aço.",
  },
  {
    numero: 8,
    titulo: "O fogão e o final",
    duracao: 17 * FPS,
    legenda:
      "Agora é só levar um cano até o fogão, colocar uma panela, um ovo frito e o feijão da sua mãe. Parabéns, você construiu um biodigestor!",
  },
];

export const DURACAO_TOTAL = CENAS.reduce((soma, c) => soma + c.duracao, 0);

export const inicioDaCena = (numero: number) =>
  CENAS.filter((c) => c.numero < numero).reduce((soma, c) => soma + c.duracao, 0);
