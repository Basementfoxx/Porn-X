import got from "got";

async function getPornPics(query) {
  const request = await got(
    `http://www.pornpics.com/search/srch.php?q=${query}&lang=en&limit=40&offset=30`,
    {
      headers: {
        Connection: "keep-alive",
        Accept:
          "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": "got-scraping/1.3.9",
      },
      maxRedirects: 14,
    }
  );

  const response = JSON.parse(request.body);
  const array = [];
  for (const res of response) {
    const url = res.t_url.replace("300", "1280");
    array.push(url);
  }
  return array;
}

export default getPornPics;
