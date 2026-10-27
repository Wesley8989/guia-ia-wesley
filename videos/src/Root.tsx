import { Composition } from "remotion";
import { Vertical } from "./Vertical";

// Formato vertical 9:16 (Reels, Shorts, TikTok)
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Vertical"
      component={Vertical}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ titulo: "Guia de IA do Wesley" }}
    />
  );
};
