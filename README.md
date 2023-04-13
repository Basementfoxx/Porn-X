<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1070412686791290910/1095813661458710579/SPOILER_1681332709821.jpg" alt="PornX" width="50%"/>
    <p align="center">
  <a href="http://forthebadge.com/" target="_blank">
    <img src="https://img.shields.io/npm/dt/porn-x.svg"/>
  </a>
    <a href="http://forthebadge.com/" target="_blank">
    <img src="https://img.shields.io/npm/v/porn-x.svg"/>
  </a>
 <a href="https://github.com/Basementfoxx/Porn-X" target="_blank">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"/>
  </a>
 <a href="https://github.com/Basementfoxx/Porn-X" target="_blank">
    <img src="https://badgen.net/npm/node/express"/>
  </a>

</p>
  <p align="center">
  <a href="https://github.com/Basementfoxx/Porn-X" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  </a>

</p>
<h3>

# ⏲️ Version 1.0.40

- ✅ | Fixed all the previous bugs.
- ✅ | Added a new "BaseCollection" class.
- ✅ | Updated the old functions (extended the results.)

## **Prerequisites** 🎀

- ### NodeJS 16+

## **Features** 📣

- ✨ Get information about a porn star via their name only.
- 📻 Able to search videos of your favorite pornstar.
- 🎈 Get complete information about a porn scene.and many more!
- 🎗️ and many more!

# ❔Installation

```
$ npm install porn-x
```

# 🪗 Usage/Examples

```ts
import { Client, BaseCollection } from "porn-x";
const client = new Client(); // Creating a new instance.

(async () => {
  // const results = await getPictures("Alison Tyler");
  // console.log(results);
  const wallpapers = await getWallpaper("Alison Tyler");
  console.log(wallpapers);
})();

async function getPictures(query) {
  const data = await client.getPictures("Alison Tyler");
  return data;
}

async function getWallpaper(query) {
  const collection = new BaseCollection();
  const result = collection.getWallpaper(query);
  return result;
}
```

# 🎉 Output

```ts
[
  'https://content5.pleasuregirl.net/upload/36/3223138.jpg',
  'https://content5.pleasuregirl.net/upload/36/2985666.jpg',
  'https://content6.pleasuregirl.net/upload/36/2971327.jpg',
  'https://content6.pleasuregirl.net/upload/36/2794449.jpg',
  'https://content6.pleasuregirl.net/upload/36/2733603.jpg',
  'https://content6.pleasuregirl.net/upload/36/2728213.jpg',
  'https://content6.pleasuregirl.net/upload/36/2713461.jpg',
  'https://content6.pleasuregirl.net/upload/36/2681913.jpg',
  'https://content6.pleasuregirl.net/upload/36/2668207.jpg',
  'https://content6.pleasuregirl.net/upload/36/2661951.jpg',
  'https://content5.pleasuregirl.net/upload/36/2657860.jpg',
  'https://content5.pleasuregirl.net/upload/36/2641508.jpg',
  'https://content5.pleasuregirl.net/upload/36/2626500.jpg',
  'https://content6.pleasuregirl.net/upload/36/2609465.jpg',
  'https://content5.pleasuregirl.net/upload/36/2580940.jpg',
  'https://content6.pleasuregirl.net/upload/36/2561795.jpg',
  'https://content6.pleasuregirl.net/upload/36/2'
  ... 190 more items
]
```

# 🧧 Using CJS?

Using commonJS but still want to use the module?
It's easy. You only have to install a single module which is [fix-esm](https://www.npmjs.com/package/fix-esm).

# CJS Example

```js
require("fix-esm").register();
// Your code will actually begin from here.
const { Client, BaseCollection, Platform } = require("porn-x");
const collection = new BaseCollection();
// Rest is just the same as esm.
(async () => {
  const wallpapers = await getWallpaper("Alison Tyler");
  console.log(wallpapers);
})();

async function getPictures(query) {
  const data = await client.getPictures("Alison Tyler");
  return data;
}

async function getWallpaper(query) {
  const result = collection.getWallpaper(query);
  return result;
}
```
