<h1>
Porn X
</h2>

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1070412686791290910/1090998411098079352/SPOILER_1680184639539.png" alt="PornX" width="70%"/>
    <p align="center">
  <a href="http://forthebadge.com/" target="_blank">
    <img src="https://img.shields.io/npm/dt/porn-x.svg"/>
  </a>
    <a href="http://forthebadge.com/" target="_blank">
    <img src="https://img.shields.io/npm/v/porn-x.svg"/>
  </a>
</p>
</p>
<h3>

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
import { Client } from "porn-x";
const client = new Client(); // Creating a new instance.

(async () => {
  const results = await getPictures("Alison Tyler");
  console.log(results);
})();

async function getPictures(query) {
  const data = await client.getPictures("Alison Tyler");
  return data;
}
```
