import got from "got";
import cheerio from "cheerio";
import ora from "ora";

async function getFapXLVideo(_url) {
  try {
    const request = await got(`${_url}`);
    const body = await request.body;
    const $ = cheerio.load(body);
    const data = $("script[type='application/ld+json']").html();
    const jsonData = JSON.parse(data);
    const url = jsonData.contentUrl.replace("//", "");
    return url;
  } catch (e) {
    return;
  }
}

export default async function getFapXl(query, options) {
  const page = !options?.page ? 1 : options?.page;
  const spinner = ora("Started fetching...").start();

  const array = [];
  try {
    const request = await got(
      `https://fapxl.com/search?query=${query}&p=${page}`,
      { maxRedirects: 3 }
    );

    const body = await request.body;
    const $ = cheerio.load(body);
    const data = $("#contentwrap");
    data
      .find(".videorow")
      .find(".video")
      .map((index, element) => {
        const $element = $(element);
        const duration = $element
          .find(".row")
          .last()
          .find("div")
          .first()
          .text()
          .trim();
        const time = strToSeconds(duration);
        if (time < 500) return;
        const title = $element.find("span.card-title").text();
        const url = $element.find("span.card-title").find("a").attr("href");
        array.push({
          title,
          url: `https://fapxl.com/${url}`,
          duration,
        });
      });

    const videos = [];
    for (const response of array) {
      spinner.color = "blue";
      spinner.text = `Fetched ${videos.length} videos`;

      const data = await getFapXLVideo(response.url);

      videos.push({
        title: response.title,
        time: response.duration,
        url: data,
      });
    }
    spinner.stopAndPersist({
      symbol: "✅",
      text: `Successfully fetched ${videos.length} videos`,
      prefixText: "",
      suffixText: "",
    });
    return videos;
  } catch (e) {
    spinner.stopAndPersist({
      symbol: "❌",
      text: `Error fetching videos... Try again later.`,
      prefixText: "",
      suffixText: "",
    });
    return [];
  }
}
function strToSeconds(stime) {
  var tt = stime.split(":").reverse();
  return (
    (tt.length >= 3 ? +tt[2] : 0) * 60 * 60 +
    (tt.length >= 2 ? +tt[1] : 0) * 60 +
    (tt.length >= 1 ? +tt[0] : 0)
  );
}
