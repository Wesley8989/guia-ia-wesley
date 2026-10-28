import { Composition } from "remotion";
import { Biodigestor } from "./biodigestor/Biodigestor";
import { DURACAO_TOTAL, FPS } from "./biodigestor/roteiro";
import { Vertical } from "./Vertical";

// Formato vertical 9:16 (Reels, Shorts, TikTok)
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Biodigestor"
        component={Biodigestor}
        durationInFrames={DURACAO_TOTAL}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Vertical"
        component={Vertical}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ titulo: "Guia de IA do Wesley" }}
      />
    </>
  );
};
