import got from "got";
import cheerio from "cheerio";
import ora from "ora";

/**
 *
 * @param {String} query
 */
async function getSpank(query) {
  const array = [];
  const slicedQuery = query.toLowerCase().replace(" ", "%20");
  const spinner = ora("Started fetching...").start();
  const url = await got(`https://spankbang.party/s/${slicedQuery}/?o=all`);
  const body = url.body;
  const $ = cheerio.load(body);
  const data = $("#browse_new");
  data
    .find(".main_results")
    .find(".video-item")
    .map((index, element) => {
      const $element = $(element);
      const _duration = $element.find("span.l").text().replace("m", "");
      const duration = convert(Number(_duration));
      if (duration < 500) return;
      const _url = $element.find("a").attr("href");
      const url = `https://spankbang.party${_url}`;
      array.push(url);
    });
  const videos = [];
  for (const response of array) {
    spinner.color = "green";
    spinner.text = `Fetched ${videos.length} videos`;
    const _data_ = await fetchActualURL(response);
    if (!_data_.title) return;
    videos.push({
      ..._data_,
    });
  }
  spinner.stopAndPersist({
    symbol: "✅",
    text: `Successfully fetched ${videos.length} videos`,
    prefixText: "",
    suffixText: "",
  });

  return videos;
}

function convert(minutes) {
  return minutes * 60;
}

async function fetchActualURL(_url) {
  try {
    const request = await got(_url);
    const body = await request.body;
    const $ = cheerio.load(body);

    const url = $("#video_container").find("video").find("source").attr("src");
    const time = $("span[class='i-length']").first().text();
    const title = $("div.left").find("h1").first().text();
    return {
      url,
      time,
      title,
    };
  } catch (e) {
    return;
  }
}

export default getSpank;
