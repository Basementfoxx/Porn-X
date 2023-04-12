// Internal
import getGifs from "../functions/getGifs.js";
import searchGif from "../functions/searchGif.js";
import getPictures from "../functions/getImages.js";
import getInformation from "../functions/getInformation.js";
import searchScene from "../functions/searchScenes.js";
import getSceneDetails from "../functions/getSceneDetails.js";
import getGifV2 from "../functions/getGifv2.js";

// Videos fetcher
import getNoodle from "../videos/getVideos.js";
import getFapXL from "../videos/getVideosv2.js";
import getSpank from "../videos/getVideosv3.js";
import getMilf from "../videos/getVideosv4.js";
import getAbsolute from "../videos/getVideosv5.js";
import getImagesFromId from "../functions/getImagesFromId.js";
import getPicturesV2 from "../functions/getPicturesV2.js";

export default class Client {
  search = async (query, options) => {
    const page = !options?.page ? 1 : options?.page;
    const v1 = (await getNoodle(query, { page })) || [];
    const v2 = (await getFapXL(query, { page })) || [];
    const v3 = (await getSpank(query)) || [];
    const v4 = (await getMilf(query, { page: page })) || [];
    const v5 = (await getAbsolute(query)) || [];
    const videos = [...v1, ...v2, ...v3, ...v4, ...v5];
    return videos;
  };
  getShortVideos = async (query, options) => {
    const result = await getGifV2(query, {
      page: options?.page,
    });
    return result;
  };
  getImagesFromId = async (id, options) => {
    const page = options?.page;
    const data = await getImagesFromId(id, { page });
    return data;
  };

  getPictures = async (name, options) => {
    const page = options?.page;
    const data = await getPicturesV2(name, { page });
    return data;
  };

  getGif = async (query) => {
    const _data_ = await getGifs(query);
    return _data_;
  };
  searchGif = async (query, options) => {
    const page = !options?.page ? 1 : options?.page;
    const results = await searchGif(query, { page });
    return results;
  };
  getImages = async (query) => {
    const results = await getPictures(query);
    return results;
  };
  getInformation = async (name) => {
    const results = await getInformation(name);
    return results;
  };
  searchScene = async (query) => {
    const result = await searchScene(query);
    return result;
  };
  getScene = async (href) => {
    const result = await getSceneDetails(href);
    return result;
  };
}
