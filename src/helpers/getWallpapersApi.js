import cheerio from "cheerio";
import got from "got";
import { REDDIT_HENTAI_QUERIES } from "../constants/redditHentaiQueries.js";

async function getHentaiReddit() {
  const query =
    REDDIT_HENTAI_QUERIES[
      Math.floor(Math.random() * REDDIT_HENTAI_QUERIES.length)
    ];
  const request = await fetch(
    `https://www.reddit.com/r/hentai/search.json?q=${query}&restrict_sr=true&include_over_18=on&limit=85`
  );
  const response = await request.json();
  const data = response.data.children;
  const array = [];
  for (const res of data) {
    const overriddenURL = String(res.data.url);
    array.push(overriddenURL);
  }
  const filteredArrayGif = array.filter((v) => !v.endsWith(".gif"));
  const filteredArrayPNG = filteredArrayGif.filter((v) => v.endsWith(".png"));
  const filteredArrayJPG = filteredArrayGif.filter((v) => v.endsWith(".jpg"));
  const filteredArrayJPEG = filteredArrayGif.filter((v) => v.endsWith(".jpeg"));
  const verdictArray = [
    ...filteredArrayPNG,
    ...filteredArrayJPEG,
    ...filteredArrayJPG,
  ];
  return verdictArray;
}

async function getHentaiEra(page = Number()) {
  const request = await got(
    `https://hentaiera.com/search/?key=wallpaper&page=${page}`
  );
  const body = request.body;
  const $ = cheerio.load(body);
  const array = [];
  $(".container")
    .find(".thumbs_container")
    .find(".thumb")
    .find(".inner_thumb")
    .map((_, element) => {
      const $element = $(element);
      const url = $element
        .find("a")
        .find("img")
        .attr("src")
        .replace("thumb", "cover");
      array.push(url);
    });
  return array;
}

async function getEroWallHentai(page = Number()) {
  const request = await got(`https://erowall.com/teg/hentai/page/${page}`);
  const body = request.body;
  const $ = cheerio.load(body);
  const array = [];
  $(".content")
    .find(".wrapper")
    .find(".wpmini")
    .map((_, element) => {
      const $element = $(element).find("a").find("img").attr(`src`);
      const url = `https://erowall.com${$element.replace("thumb", "original")}`;
      array.push(url);
    });
  return array;
}
export { getHentaiReddit, getEroWallHentai, getHentaiEra };
