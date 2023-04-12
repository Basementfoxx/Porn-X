import cheerio from "cheerio";
import got from "got";
import getHighResolutionPix from "../helpers/getPixsHighResolution.js";

async function getImagesFromId(imageId = String(), options = {}) {
  const page = !options?.page ? 1 : options?.page;
  if (typeof page !== "number")
    throw new Error("The page needs to be a number.");
  const photoArray = [];
  const request = await got(`https://sxypix.com/w/${imageId}/${page}`);
  const body = request.body;
  const $ = cheerio.load(body);
  const isExists =
    $("#content").find("#center_panel").find(".grid").has("div").html() === null
      ? false
      : true;
  if (!isExists) throw new Error(`The page number doesn't exists.`);
  const x = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-x");
  const aid = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-aid");
  const ghash = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-ghash");
  const pictureId = $("#content")
    .find("#center_panel")
    .find(".grid")
    .find("div")
    .attr("data-photoid");
  const obj = {
    ghash,
    aid,
    x,
    width: 1399,
    pid: pictureId,
  };
  const res = await getHighResolutionPix(obj);
  res?.r.map((v, _) => {
    const $ = cheerio.load(v);
    const urlPATH = $(".gall_pix_el")
      .find("img")
      .attr("data-src")
      .replace("/cdn/x", "");
    const imageURL = `https://x.sxypix.com/pixi${urlPATH}`;
    photoArray.push(imageURL);
  });
  return photoArray;
}
export default getImagesFromId;
