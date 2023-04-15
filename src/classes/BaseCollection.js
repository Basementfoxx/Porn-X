import { default as getMobWallpaper } from "../extras/getMobWallpaper.js";
import { getHentai } from "../handler/index.js";
import { getRandomWallpaper } from "../helpers/getRandomWallpaper.js";
import { getRandom } from "../extras/getRandom.js";
export default class Collector {
  getWallpaper = async (query) => {
    const arrayOfWallpapers = await getMobWallpaper(query);
    return arrayOfWallpapers;
  };
  getHentaiWallpaper = async () => {
    const ____results____ = await getHentai();
    return ____results____;
  };
  getRandomWallpaper = async (platform) => {
    const result = await getRandomWallpaper(platform);
    return result;
  };
  getRandomImage = async () => {
    const response = await getRandom();
    return response;
  };
}
