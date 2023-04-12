import got from "got";
import cheerio from "cheerio";

export default async function getGifV2(query = String(), options = {}) {
  const page = !options?.page ? 1 : options?.page;
  const formattedQuery = query
    .replace("-", "+")
    .trim()
    .replace(" ", "+")
    .toLowerCase();

  try {
    const request = await got(
      `https://www.pornhub.org/gifs/search?search=${formattedQuery}&page=${page}`,
      {
        headers: {
          Connection: "keep-alive",
          Accept:
            "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
          "Accept-Language": "en",
          "User-Agent": "got-scraping/1.3.9",
        },
      }
    );
    const arraysOfGif = [];
    const body = request.body;
    const $ = cheerio.load(body);
    $(".wrapper")
      .find(".container")
      .find(".nf-videos")
      .find(".gifsWrapper")
      .find("ul")
      .find("li.gifVideoBlock")
      .map((_, element) => {
        const $element = $(element);
        const videos = $element.find("a").find("video").attr("data-mp4");
        arraysOfGif.push(videos);
      })
      .html();
    return arraysOfGif;
  } catch (e) {
    if (e.message === "read ECONNRESET") {
      const page = !options?.page ? 1 : options?.page;
      const res = await getGifV2(formattedQuery, {
        page,
      });
      console.log(`Error gone done.`);
      return res;
    }
  }
}
