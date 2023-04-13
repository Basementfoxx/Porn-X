import got from "got";
import cheerio from "cheerio";

export async function handleMobile() {
  const queries = [
    "4k-hd-porn",
    "hot",
    "big tits",
    "sexy",
    "busty",
    "amateur",
    "mom",
    "solo-model",
    "galleries",
  ];
  const suffixedQuery = queries[Math.floor(Math.random() * queries.length)];
  const randomPageV1 = Math.floor(Math.random() * 8) + 1;
  const randomPageV2 = Math.floor(Math.random() * 50) + 1;
  const array = [];
  const BASE_URI =
    suffixedQuery === "galleries"
      ? `https://www.pornpictureshq.com/block/thumbs/galleries?page=${randomPageV2}`
      : `https://www.pornpictureshq.com/block/thumbs/search?q=${suffixedQuery}&page=${randomPageV1}`;

  const request = await got(BASE_URI);
  const body = request.body;
  const $ = cheerio.load(body);
  $(body).map((_, element) => {
    const $element = $(element);
    const image = $element.find("a").find("img").attr("data-src");
    const imageURL = String(image).replace("300x", "600x");
    const title = $element.find("a").find("img").attr("alt") || "No title";
    array.push({
      title,
      image: imageURL,
    });
  });

  const randomPicture = array[Math.floor(Math.random() * array.length)];
  return randomPicture;
}
