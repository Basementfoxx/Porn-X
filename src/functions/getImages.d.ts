interface Images {
  title?: string;
  results?: number | null;
  images?: string[];
}

export default function getImages(query: string): Promise<Images>;
