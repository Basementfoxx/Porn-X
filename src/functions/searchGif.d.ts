interface GifResponse {
  title?: string;
  gif?: string;
}

interface Options {
  page?: number | undefined;
}
export default function searchGif(
  query: string,
  options?: Options
): Promise<GifResponse[]>;
