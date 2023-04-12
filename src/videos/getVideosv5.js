import got from "got";
import cheerio from "cheerio";
import ora from "ora";

export default async function getVideoV5(query) {
  const spinner = ora("Started fetching...").start();
  try {
    const request = await got(
      `http://www.absoluporn.com/en/search-${query}-1.html`
    );
    const array = [];
    const body = request.body;
    const $ = cheerio.load(body);
    $(".bloc-centre")
      .find(".bloc-menu-centre")
      .find(".bloc-thumb")
      .find(".thumb-main")
      .map((_, element) => {
        const $element = $(element);
        const _time = $element.find(".thumb-video-img").find(".time").text();
        const time = strToSeconds(_time);
        if (time < 500) return;
        const title = $element.find(".thumb-main-titre").text();
        const urlPath = $element
          .find(".thumb-main-titre")
          .find("a")
          .attr("href")
          .replace("..", "");
        const url = `http://www.absoluporn.com${urlPath}`;
        array.push({
          title,
          time: _time,
          url,
        });
      });
    const videos = [];
    for (const response of array) {
      spinner.color = "cyan";
      spinner.text = `Fetched ${videos.length} videos`;

      const url = await scrapeVideo(response?.url);
      if (!url) return;
      videos.push({
        title: response?.title,
        time: response?.time,
        url,
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

async function scrapeVideo(url) {
  const request = await got(url);
  const body = request.body;
  const $ = cheerio.load(body);
  const data = $(".bloc-centre")
    .find(".bloc-player")
    .find("video")
    .find("source")
    .attr("src");
  return data;
}

function strToSeconds(stime) {
  var tt = stime.split(":").reverse();
  return (
    (tt.length >= 3 ? +tt[2] : 0) * 60 * 60 +
    (tt.length >= 2 ? +tt[1] : 0) * 60 +
    (tt.length >= 1 ? +tt[0] : 0)
  );
}
