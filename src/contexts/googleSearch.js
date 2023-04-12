import googlethis from "googlethis";
import { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } from "google-img-scrap";
import { getGif } from "./getGifs.js";
async function googleSearch(query) {
  const array = [];
  const queries = [
    `${query} hot gifs`,
    `${query} porn gifs`,
    `${query} gif`,
    `${query} pornhub gifs`,
  ];

  const suffixQuery = queries[Math.floor(Math.random() * queries.length)];
  const queryToSend = `${suffixQuery} gifs    site:"pornhub.com"`;

  try {
    const data = await GOOGLE_IMG_SCRAP({
      search: `${suffixQuery} gif`,
      query: {
        TYPE: GOOGLE_QUERY.TYPE.GIF,
      },
      domains: ["pornhub.com"],
      safeSearch: false,
      limit: 50,
    });
    for (const res of data.result) {
      array.push(res.url);
    }

    const searchV2 = await googlethis.image(queryToSend, {
      safe: false,
    });
    const filteredArray = searchV2.filter((gif) => gif.url.endsWith(".gif"));
    for (const res of filteredArray) {
      array.push(res.url);
    }

    return {
      results: array.length,
      gifs: array,
    };
  } catch (e) {
    try {
      const searchV2 = await googlethis.image(queryToSend, {
        safe: false,
      });
      const filteredArray = searchV2.filter((gif) => gif.url.endsWith(".gif"));
      for (const res of filteredArray) {
        array.push(res.url);
      }
      const gifs = await getGif(query);
      for (const arrays of gifs) {
        array.push(arrays);
      }
      return {
        results: array.length,
        gifs: array,
      };
    } catch (e) {
      return {
        error:
          "An error has been occurred while fetching the gifs, please try again in a while.",
      };
    }
  }
}

export { googleSearch };
