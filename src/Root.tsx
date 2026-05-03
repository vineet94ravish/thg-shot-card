import { Composition } from "remotion";
import { ShotCard } from "./ShotCard";

export const RemotionRoot = () => {
  return (
    <Composition
      id="ShotCard"
      component={ShotCard}
      durationInFrames={300} // 10 seconds at 30fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
