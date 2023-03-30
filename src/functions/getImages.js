import got from "got";
import cheerio from "cheerio";

/**
 * @param {String} query
 * @returns
 */
export default async function getImages(query) {
  const starQuery = query.toLowerCase().replace(/\s+/g, "-").trim();
  const baseURL = `https://www.auntmia.com/pictures/${query}`;
  const request = await got(baseURL);
  const body = request.body;
  const $ = cheerio.load(body);
  const data = $("section.content")
    .find("div#gallery-container")

    .find(".grid-item");
  const title = $("section.content").find("div.title-section").text().trim();
  const array = [];

  const res = data.map(async (index, element) => {
    const $element = $(element);
    const href = $element.find("a").attr("href");
    const doesIncludes = href.includes(`${starQuery}`);
    if (!doesIncludes) return;
    const images = $element.find("a").find("img").attr("data-src");
    array.push(images);
  });
  return {
    title,
    results: array.length,
    images: array,
  };
}
