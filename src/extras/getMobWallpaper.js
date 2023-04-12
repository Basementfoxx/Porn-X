import cheerio from "cheerio";
import got from "got";
import getPornPics from "../helpers/getPornPicsApi.js";

export default async function getMobWallpaper(query = String()) {
  const baseURL = `https://www.pleasuregirl.net/search/${query}/`;
  const request = await got(baseURL);
  const body = request.body;
  const $ = cheerio.load(body);
  const array = [];
  $(".wrapper")
    .find("main")
    .find(".container")
    .find("section")
    .find(".masonry-thumbs")
    .find(".grid-item")
    .map((_, element) => {
      const $element = $(element);
      const data = $element.find(".box-img").find("img").attr("src");
      const title = $element.find(".description").text();
      const isQueryMatched = title.includes(`${query}`);
      if (!isQueryMatched) return;
      if (!data) return;
      const url = `https:${data}`;
      array.push(url);
    });
  const requestReddit = await fetch(
    `https://www.reddit.com/r/ModelsGoneMild/search.json?q=${query}&restrict_sr=true&include_over_18=on&limit=85`
  );
  const response = await requestReddit.json();
  const data = response.data.children;
  for (const res of data) {
    const url = res?.data?.url_overridden_by_dest;
    array.push(url);
  }

  try {
    const posts = await getPornPics(query);
    for (const _posts_ of posts) {
      array.push(_posts_);
    }
    return array;
  } catch (e) {
    try {
      const posts = await getPornPics(query);
      for (const _posts_ of posts) {
        array.push(_posts_);
      }
      return array;
    } catch (e) {
      try {
        const posts = await getPornPics(query);
        for (const _posts_ of posts) {
          array.push(_posts_);
        }
        return array;
      } catch (e) {
        console.error("Error forbidden ");
      }
    }
  }
}
