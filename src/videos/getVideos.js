import got from "got";
import cheerio from "cheerio";
import ora from "ora";

const getEmbedNoodle = async (_url) => {
  try {
    const request = await got(_url);

    const body = await request.body;
    const $ = cheerio.load(body);
    const data = $("script[type='application/ld+json']").html();
    const jsonData = JSON.parse(data);
    const name = jsonData.name;
    const url = jsonData.embedUrl;
    return {
      title: name,
      url,
    };
  } catch (e) {
    return;
  }
};

const getNoodle = async (query, options) => {
  const page = !options?.page ? 1 : options?.page;
  const spinner = ora("Started fetching...").start();
  const request = await got(
    `https://noodlemagazine.com/video/${query}?p=${page}`
  );
  const body = await request.body;
  const $ = cheerio.load(body);
  const array = [];
  $(".list_videos")
    .find(".item")
    .map((index, element) => {
      const $element = $(element);
      const time = $element.find(".m_time").text();
      const _time = strToSeconds(time);
      if (_time < 500) return;
      const url = $element.find("a").attr("href");
      array.push({
        duration: time.trim(),
        url: `https://noodlemagazine.com${url}`,
      });
    });

  const videos = [];

  for (const response of array) {
    spinner.color = "red";
    spinner.text = `Fetched ${videos.length} videos`;
    const _data_ = await getEmbedNoodle(response.url);
    if (!_data_.title) return;
    videos.push({
      ..._data_,
      time: response.duration,
    });
  }
  spinner.stopAndPersist({
    symbol: "✅",
    text: `Successfully fetched ${videos.length} videos`,
    prefixText: "",
    suffixText: "",
  });

  return videos;
};

export default getNoodle;
function strToSeconds(stime) {
  var tt = stime.split(":").reverse();
  return (
    (tt.length >= 3 ? +tt[2] : 0) * 60 * 60 +
    (tt.length >= 2 ? +tt[1] : 0) * 60 +
    (tt.length >= 1 ? +tt[0] : 0)
  );
}
