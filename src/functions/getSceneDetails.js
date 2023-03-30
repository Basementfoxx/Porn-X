import got from "got";
import cheerio from "cheerio";

export default async function getSceneDetail(href) {
  const array = [];
  const baseURL = `https://www.adultfilmdatabase.com/${href}`;
  const request = await got(baseURL);
  const htmlBody = request.body;
  const $ = cheerio.load(htmlBody);
  const data = $(".w3-content");
  const title = data.find(".w3-round").find("h1").text().trim();
  const image = data
    .find(".w3-col")
    .find(".m12")
    .find(".w3-container")
    .find("a")
    .find("img")
    .attr("src");
  const studio = $(`.w3-container:contains("Studio:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim();
  const director = $(`.w3-container:contains("Director:")`)
    .parent()
    .find("span[itemprop='director']")
    .text()
    .trim();
  const runtime = $(`.w3-container:contains("Director:")`)
    .parent()
    .find("span[itemprop='duration']")
    .text()
    .trim()
    .replace("Runtime:", "")
    .trim();
  const description = $("p[itemprop='description']").text().trim();
  $('span[itemprop="actor"]')
    .parent()
    .parent()
    .parent()
    .find("a")
    .map((index, element) => {
      const $element = $(element);
      const imagePath = $element.find("img").attr("src");
      const image = `https://www.adultfilmdatabase.com${imagePath}`;
      const title = $element.find("p").text().trim();
      array.push({
        title,
        image,
      });
    });
  return {
    title,
    image: `https://www.adultfilmdatabase.com${image}`,
    studio,
    director,
    runtime,
    description,
    starring: array,
  };
}
