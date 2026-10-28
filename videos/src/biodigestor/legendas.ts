// Distribui as palavras da legenda ao longo da cena e agrupa em "páginas".
export type PalavraTemporizada = {
  palavra: string;
  inicio: number;
  fim: number;
};

const MARGEM_INICIO = 6;
const MARGEM_FIM = 10;

// Palavras longas e pontuação ganham mais tempo, como numa narração.
const peso = (palavra: string) => {
  let p = palavra.length + 3;
  if (/[.!?:]$/.test(palavra)) p += 10;
  else if (/[,;]$/.test(palavra)) p += 5;
  return p;
};

export const temporizarPalavras = (texto: string, duracao: number): PalavraTemporizada[] => {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const pesos = palavras.map(peso);
  const total = pesos.reduce((a, b) => a + b, 0);
  const escala = (duracao - MARGEM_INICIO - MARGEM_FIM) / total;
  let t = MARGEM_INICIO;
  return palavras.map((palavra, i) => {
    const inicio = t;
    t += pesos[i] * escala;
    return { palavra, inicio: Math.round(inicio), fim: Math.round(t) };
  });
};

export const normalizar = (palavra: string) =>
  palavra.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");

// Frame em que a palavra (n-ésima ocorrência) começa a ser dita.
// Usado para sincronizar as animações com a legenda.
export const criarDeixa =
  (palavras: PalavraTemporizada[]) =>
  (alvo: string, ocorrencia = 1): number => {
    let n = 0;
    for (const p of palavras) {
      if (normalizar(p.palavra) === normalizar(alvo) && ++n === ocorrencia) {
        return p.inicio;
      }
    }
    throw new Error(`Deixa não encontrada na legenda: "${alvo}" (${ocorrencia}ª)`);
  };

const MAX_PALAVRAS = 5;
const MAX_LETRAS = 24;

export const paginar = (palavras: PalavraTemporizada[]): PalavraTemporizada[][] => {
  const paginas: PalavraTemporizada[][] = [];
  let atual: PalavraTemporizada[] = [];
  let letras = 0;
  for (const p of palavras) {
    if (atual.length > 0 && (atual.length >= MAX_PALAVRAS || letras + p.palavra.length > MAX_LETRAS)) {
      paginas.push(atual);
      atual = [];
      letras = 0;
    }
    atual.push(p);
    letras += p.palavra.length + 1;
    if (/[.!?:,]$/.test(p.palavra) && atual.length >= 2) {
      paginas.push(atual);
      atual = [];
      letras = 0;
    }
  }
  if (atual.length) paginas.push(atual);
  return paginas;
};
