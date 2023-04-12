import got from "got";
import cheerio from "cheerio";

export async function getGif(query) {
  const arrays = [];
  const baseURL = `https://erothots.co/gifs/${query} gifs`;
  const request = await got(baseURL);
  const body = request.body;
  const $ = cheerio.load(body);
  $(".container")
    .find(".main")
    .find(".content-post")
    .find(".section")
    .find(".gallery-content")
    .find(".grid-item")
    .map((_, element) => {
      const $element = $(element);
      const title = $element.find("a").find("h3").text();
      if (!title.includes(query || `${query}`)) return;
      const data = $element
        .find("a")
        .find("img")
        .attr("data-src")
        .replace("anim.webp", "media.mp4");
      arrays.push(data);
    });
  return arrays;
}
