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
export interface ScenesResponse {
  title?: string;
  image?: string;
  totalResults?: number | null;
  entries: ScenesEntries[];
}
