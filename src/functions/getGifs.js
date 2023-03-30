import googlethis from "googlethis";

/**
 * @param {String} query
 */
export default async function getGif(query) {
  const _query = query;
  const queries = [
    `${_query} hot gifs`,
    `${_query} porn gifs`,
    `${_query} gif`,
    `${_query} pornhub gifs`,
  ];
  const suffixQuery = queries[Math.floor(Math.random() * queries.length)];
  const data = await googlethis.image(suffixQuery, {
    safe: false,
  });
  const array = [];
  const filteredArray = data.filter((gif) => gif.url.endsWith(".gif"));
  filteredArray.map((item) => {
    array.push(item.url);
  });
  return {
    results: array.length,
    gifs: array,
  };
}
