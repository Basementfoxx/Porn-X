import { IPictures } from "../typings/index.js";
interface Options {
  page?: number;
}
/**
 **How this function is different from the "getImages" function?*
 - Indeed, this function is quite similar to the getImages function however, this function return you a @interface Array<IPictures[]> which includes an id and as well as the image url. You can look up to a specific image via using the image id.
 @function getImagesFromId 
 */
export default function getPictures(
  name: string,
  options?: Options
): Promise<IPictures[]>;
