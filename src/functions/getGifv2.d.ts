declare interface Options {
  page?: number;
}
export default function getGifV2(
  query: string,
  options?: Options
): Promise<string[]>;
