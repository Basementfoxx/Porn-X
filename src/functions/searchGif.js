import got from "got";
import cheerio from "cheerio";
/**
 *
 * @param {String} query
 * @param {{ page?: number}} options
 */
export default async function searchGif(query, options = {}) {
  const page = options?.page ? options?.page : 1;
  if (page >= 20) throw new Error("Max page limit: 20");
  const array = [];
  const baseURL = `https://porngifs.xxx/page/${page}/?s=${query}`;
  const request = await got(baseURL);
  const htmlBody = request.body;
  const $ = cheerio.load(htmlBody);
  $("#container")
    .find("#masonry_container")
    .find("div.masonry_box")
    .map((index, element) => {
      const $element = $(element);
      const title = $element.find(".image_wrapper").attr("title");
      const url = $element.find(".image_wrapper").find("img").attr("data-gif");
      array.push({
        title,
        gif: url,
      });
    });

  return array;
}
