import cheerio from "cheerio";
import got from "got";

export async function desktop() {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const request = await got(`https://ftopx.com/xxx-walls/page/${randomPage}/`);
  const body = request.body;
  const $ = cheerio.load(body);
  const arrays = [];
  $(".main-container")
    .find(".row")
    .first()
    .find(".col-md-4")
    .map((_, element) => {
      const $element = $(element);
      const data = $element.find("a").find("img").attr("src");
      const url = data.replace("/mini/", "/pic/1920x1080/");
      arrays.push({
        title: "No title",
        url: url,
      });
    });
  const filteredArray = arrays[Math.floor(Math.random() * arrays.length)];
  return filteredArray;
}
