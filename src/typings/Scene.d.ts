interface Starring {
  title?: string;
  image?: string;
}
interface SceneDetails {
  title?: string;
  image?: string;
  studio?: string;
  director?: string;
  runtime?: string;
  description?: string;
  starring?: Starring[];
}
export { SceneDetails as Scene };
