interface Starring {
  title?: string;
  image?: string;
}
export interface Scene {
  title?: string;
  image?: string;
  studio?: string;
  director?: string;
  runtime?: string;
  description?: string;
  starring?: Starring[];
}
