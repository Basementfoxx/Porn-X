import { IPictures } from "../typings/index.js";

interface SearchResults {
  title: string;
  url: string;
  time: string;
  poster?: string;
}

interface Options {
  page?: number | null;
}
interface GifData {
  result: number;
  gifs?: string[];
}
interface GifResponse {
  title?: string;
  gif?: string;
}
interface Images {
  title?: string;
  results?: number | null;
  images?: string[];
}
interface Information {
  name?: string;
  about?: string;
  age?: number | null;
  anotherNames?: string[];
  boobsType?: string;
  tattoos?: string | undefined;
  activeYears?: string;
  cupSize?: string;
  bodyType?: string;
  height?: string;
  weight?: string;
  eyeColor?: string;
  hairColor?: string;
  images?: string[];
}
interface ScenesEntries {
  href: string;
  title: string;
  year: string;
  studio: string;
  genre: string[];
  id: string;
  image: string;
  director?: string;
}
interface ScenesResponse {
  title?: string;
  image?: string;
  totalResults?: number | null;
  entries: ScenesEntries[];
}
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
export default class Client {
  /**
   * Get a bunch of videos of your favorite star. However this method may take some time fetching the videos.
   */
  search(query: string, options?: Options): Promise<SearchResults[]>;
  /**@since 29th March 2023
   * @requires Name
   * @description Personally, i don't suggest using this function. There are high possibilities, you might not get what response you're looking for. Though it's not deprecated.
   * @returns
   */
  getGif(query: string): Promise<GifData>;
  /**
   * @description Searches a nsfw gif
   * @example
   ```ts
    const data = await searchGif("Blowjob" || "Ass" || "Spank" || "MouthFuck"); // etc etc...
   ```
   * @returns
   */
  searchGif(query: string, options?: Options): Promise<GifResponse[]>;
  /**
   * @description Get a bunch pictures of a star.
   * @example
   ```ts
    const data = await getPictures("Alison Tyler");
   ```
   @returns
   */
  getImages(query: string): Promise<Images>;
  /**
   * @param name Star name
   * @description Get complete information about a star.
   * @returns
   */
  getInformation(name: string): Promise<Information>;
  searchScene(query: string): Promise<ScenesResponse>;
  /**
   * @default
   * @param href The scene href.
   * @returns
   */
  getScene(href: string): Promise<SceneDetails>;
  getImagesFromId(id: string, options?: Options): Promise<string[]>;
  /**
   **How this function is different from the "getImages" function?*
  - Indeed, this function is quite similar to the getImages function however, this function return you a @interface Array<IPictures[]> which includes an id and as well as the image url. You can look up to a specific image via using the image id.
  @function getImagesFromId 
  */
  getPictures(name: string, options?: Options): Promise<IPictures[]>;
  /**
   * *What's this function?*
   * - This function is similar to the "getGif" however, there are a lot of drawbacks in the function itself. This function returns a @interface Array<string[]> of short mp4 videos.
   */
  getShortVideos(query: string, options?: Options): Promise<string[]>;
}
