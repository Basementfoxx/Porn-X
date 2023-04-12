import cheerio from "cheerio";
import got from "got";

export default async function getPictures(name = String(), options = {}) {
  const page = !options?.page ? 1 : options?.page;
  const starName = name.replace(" ", "-").trim();
  const photoArray = [];
  const request = await got(`https://sxypix.com/s/${starName}/${page}`);
  const body = request.body;
  const $ = cheerio.load(body);
  const hasGnf =
    $("#content").find("#center_panel").find(".grid").has("div").html() === null
      ? false
      : true;
  if (!hasGnf) throw new Error(`The page number doesn't exists.`);

  $("#content")
    .find("#center_panel")
    .find(".grid")
    .find("a")
    .map((index, element) => {
      const baseURL = `https://sxypix.com`;
      const $element = $(element);
      const photoIdHref = $element.attr("href");
      const photoId = photoIdHref.split("?")[0].split("/w/")[1];
      const photoBackPath = $element.find("div").find("img").attr("data-src");
      const photoURL = `${baseURL}${photoBackPath}`;
      photoArray.push({
        id: photoId,
        image: photoURL,
      });
    });
  return photoArray;
}
