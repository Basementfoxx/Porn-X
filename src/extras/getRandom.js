export async function getRandom() {
  const array = [];
  const queries = ["pornpics", "UHDnsfw", "HighResNSFW"];
  const query = queries[Math.floor(Math.random() * queries.length)];
  const BASE_URL = `https://www.reddit.com/r/${query}/random.json`;
  const request = await fetch(BASE_URL);
  const response = await request.json();
  const url = response[0].data.children[0].data.url;

  if (url.includes("gallery")) {
    const mediaData = response[0].data.children[0].data.media_metadata;
    for (const ids in mediaData) {
      const response = mediaData[ids].p.filter((v, index) => {
        return v.x === 640;
      });
      const baseURL = response[0]?.u;
      const url = formatURL(baseURL);
      array.push(url);
    }
  } else {
    array.push(url);
  }
  const finalURL = array[Math.floor(Math.random() * array.length)];
  return finalURL;
}

function formatURL(url) {
  const finalString = url.replace(/[~`!@#$%^*()+{}\[\];\'\"<>,\\\\-_]/g, "");
  const replaceString = finalString.split("amp");
  const d = replaceString
    .map((v) => {
      return `${v}`;
    })
    .join("");
  return d;
}
