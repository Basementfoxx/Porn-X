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

# ⏲️ Version 1.0.45

- ✅ | Fixed all the previous bugs.
- ✅ | Added new function "getRandomImage".
- ✅ | Extended the results of "getWallpaper"

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
  const result = await client.getGif("Alison Tyler");
  console.log(result);
})();
```

# 🎉 Output

```ts

{
  results: 75,
  gifs: [
    'https://dl.phncdn.com/gif/13476792.gif',
    'https://dl.phncdn.com/gif/16197072.gif',
    'https://el.phncdn.com/gif/32148161.gif',
    'https://dl.phncdn.com/pics/gifs/029/516/581/(m=ldpwiqacxtE_Ai)(mh=WDU8edZ52bgTD0TY)29516581b.gif',
    'https://dl.phncdn.com/gif/10401922.gif',
    'https://dl.phncdn.com/gif/18181001.gif',
    'https://dl.phncdn.com/pics/gifs/005/197/841/(m=ldpwiqacxtE_Ai)(mh=o5QbIuPPL5aMG9f-)5197841b.gif',
    'https://el.phncdn.com/gif/24686431.gif',
    'https://el.phncdn.com/pics/gifs/004/840/191/(m=ldpwiqacxtE_Ai)(mh=WDL7dBDbwwy_yCB2)4840191b.gif',
    'https://dl.phncdn.com/pics/gifs/024/683/181/(m=ldpwiqacxtE_Ai)(mh=v3b6Q28pvBaBPuAy)24683181b.gif',
    'https://el.phncdn.com/pics/gifs/005/798/351/(m=ldpwiqacxtE_Ai)(mh=t-dUEfFNVKC5tJ33)5798351b.gif',
  ]
  ... 30 more items
}


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
