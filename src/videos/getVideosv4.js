import got from "got";
import cheerio from "cheerio";
import ora from "ora";

/**
 * @param {String} query
 * @param {{ page?: number}} options
 */
export default async function retrieveData(query, options = {}) {
  const spinner = ora("Started fetching...").start();
  const request = await got(
    `https://milf300.com/search?q=${query}&page=${
      !options?.page ? 1 : options?.page
    }`,
    {
      headers: {
        Accept:
          "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": "got-scraping/1.3.9",
      },
    }
  );
  const body = request.body;
  const $ = cheerio.load(body);
  const array = [];
  $(".row")
    .find(".col-md-3")
    .map(async (index, element) => {
      const $element = $(element);
      const _href = $element.find("p").find("a").attr("href");
      const title = $element.find("p").find("a").html();
      const href = `https://milf300.com${_href}`;
      const _duration = $element.find(".top_text").text().trim();
      const duration = strToSeconds(_duration);
      if (duration < 500) return;
      array.push({
        title,
        href,
        time: _duration,
      });
    });
  const videos = [];
  for (const response of array) {
    spinner.color = "yellow";
    spinner.text = `Fetched ${videos.length} videos`;

    const _result_ = await getMilf300(response.href);
    videos.push({
      time: response.time,
      title: response.title,
      url: _result_.videoURL,
      poster: _result_.poster,
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
function strToSeconds(stime) {
  var tt = stime.split(":").reverse();
  return (
    (tt.length >= 3 ? +tt[2] : 0) * 60 * 60 +
    (tt.length >= 2 ? +tt[1] : 0) * 60 +
    (tt.length >= 1 ? +tt[0] : 0)
  );
}

async function getMilf300(url) {
  try {
    const request = await got(url, {
      headers: {
        Accept:
          "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": "got-scraping/1.3.9",
      },
    });
    const body = await pretty(request.body);
    const $ = cheerio.load(body);
    const poster = $(".col-md-8").find("video").attr("poster");
    const videoURL = $(".col-md-8").find("video").find("source").attr("src");
    return {
      poster,
      videoURL,
    };
  } catch (e) {
    return;
  }
}
