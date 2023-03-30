interface GifData {
  result: number;
  gifs?: string[];
}
/**@since 29th March 2023n
 * @description Personally, i don't suggest using this function. There are high possibilities, you might not get what response you're looking for. Though it's not deprecated.
 */
export default function getGif(query: string): Promise<GifData>;
