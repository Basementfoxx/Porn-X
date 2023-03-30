import got from "got";
import cheerio from "cheerio";

/**
 * @param {String} query
 */
export default async function getInformation(query) {
  const baseURL = `https://www.babepedia.com/babe/${query}`;
  const request = await got(baseURL);
  const htmlBody = request.body;
  const $ = cheerio.load(htmlBody);

  const imagesArray = [];
  const name = await $(`h1:contains("${query}")`).text();

  const about = $(`h2:contains("About ${name}")`)
    .next()
    .text()
    .replace(/\s+/g, " ");
  const age = $(`span:contains("Age")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/\D/g, "");
  const anotherNames = $(`h2:contains("aka")`)
    .text()
    .replace("aka", "")
    .replace(/\s+/g, " ")
    .trim()
    .split("/")
    .map((str) => str.trim());

  const boobsType = $(`span:contains("Boobs")`).parent().find("a").text();
  const tattoos =
    $(`span:contains("Tattoos")`)
      .parent()
      .text()
      .trim()
      .split(" ")
      .slice(1)
      .join(" ")
      .split("\n")[0]
      .trim()
      .replace(/[^\w\s]/gi, "") || "No tattoos";
  const activeYears = $(`span:contains("Years active:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim();

  const cupSize = $(`span:contains("Bra/cup size:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("size:", "")
    .trim();
  const bodyType = $(`span:contains("Body type:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("type:", "")
    .trim();
  const height = $(`span:contains("Height:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim();
  const weight = $(`span:contains("Weight:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim();
  const eyeColor = $(`span:contains("Eye color:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("color:", "")
    .trim();

  const hairColor = $(`span:contains("Hair color:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("color:", "")
    .trim();

  const fetchGalleries = $(`h2:contains("Galleries")`)
    .parent()
    .find("div")
    .find("div")
    .map(async (index, element) => {
      const $element = $(element).find("a").find("img").attr("data-src");
      const images = `https://www.babepedia.com${$element}`;
      return imagesArray.push(images);
    });

  const userGalleries = $(`h2:contains("Uploaded By Our Users")`)
    .parent()
    .find("div")
    .find("div")
    .map(async (index, element) => {
      const $element = $(element).find("a").find("img").attr("data-src");
      const images = `https://www.babepedia.com${$element}`;
      return imagesArray.push(images);
    });
  return {
    name,
    about,
    age: Number(age),
    anotherNames,
    boobsType,
    tattoos,
    activeYears,
    cupSize,
    bodyType,
    height,
    weight,
    eyeColor,
    hairColor,
    images: imagesArray,
  };
}
