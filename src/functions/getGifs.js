import googlethis from "googlethis";
import { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } from "google-img-scrap";
import { googleSearch } from "../contexts/googleSearch.js";

/**
 * @param {String} query
 */
export default async function getGif(query) {
  const res = await googleSearch(query);
  return res;
}
