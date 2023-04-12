import axios from "axios";

async function getPixHighResolution(object = {}) {
  let html = await axios({
    method: "post",
    url: "https://sxypix.com/php/gall.php",
    data: object,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const result = await html.data;
  return result;
}
export default getPixHighResolution;
