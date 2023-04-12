interface Options {
  page?: number;
}
export default function getImagesFromId(
  imageId: string,
  options?: Options
): Promise<string[]>;
