import googlethis from "googlethis";
import cheerio from "cheerio";
import got from "got";

export default async function searchScenes(query) {
  const $queryToSearch = `adultfilmdatabase ${query}`;
  const $this = await googlethis.search($queryToSearch, {
    safe: false,
    parse_ads: false,
  });
  const $filteredArray = $this.results.filter((result) =>
    result.url.includes("adultfilmdatabase")
  );
  const $urlToFetch = $filteredArray[0].url;
  const array = [];
  const baseURL = `${$urlToFetch}`;
  const request = await got(baseURL);
  const htmlBody = request.body;
  const $ = cheerio.load(htmlBody);
  const title = $(".w3-content").find(".w3-round").find("h1").text().trim();
  const imagePath = $(".w3-content")
    .find(".m2")
    .find(".w3-container")
    .find("img")
    .attr("src");
  const image = `https://www.adultfilmdatabase.com${imagePath}`;

  $(".w3-content")
    .find(".m10")
    .find(".w3-padding")
    .find("#tabs-1")
    .find("table[id='table_id']")
    .find("tbody")
    .find("tr")
    .map((index, element) => {
      const $element = $(element);
      const title = $element.find("a").text().trim();
      const year = $element.find("td:nth-child(4)").text().trim();
      const pathURL = $element.find("a").attr("actorthumb");
      const href = $element.find("a").attr("href");
      const studio = $element.find("td:nth-child(2)").text().trim();
      const image = `https://www.adultfilmdatabase.com${pathURL}`;
      const trimmedArray = $element.find("a").attr("href").split("/");
      const id = trimmedArray.filter((item) => {
        return parseInt(item) == item;
      })[0];
      const genre = $element.find("td:nth-child(3)").text().trim().split(",");
      const director = $element.find("td:nth-child(5)").text().trim();
      array.push({
        title,
        year,
        director,
        studio,
        href,
        id: Number(id),
        image,
        genre,
      });
    });
  return {
    title,
    image,
    totalResults: array.length,
    entries: array,
  };
}
