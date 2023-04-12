import {
  getEroWallHentai,
  getHentaiEra,
  getHentaiReddit,
} from "../helpers/getWallpapersApi.js";

export async function getHentai() {
  const arrayOfImages = [];
  const pageV2 = Math.floor(Math.random() * 4) + 1;
  const pageV3 = Math.floor(Math.random() * 15) + 1;
  const V1 = await getHentaiReddit();
  const V2 = await getEroWallHentai(pageV2);
  const V3 = await getHentaiEra(pageV3);
  // const V2 = await getEroWallHentai()
  return [...V1, ...V2, ...V3];
}
