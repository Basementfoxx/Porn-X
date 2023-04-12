import { randomWallpaperTypes as types } from "../constants/randomWallpaperOptions.js";
import { handleMobile } from "./mobile.js";
import { desktop } from "./desktop.js";
export async function getRandomWallpaper(platform = String()) {
  if (!types.includes(platform))
    throw new Error(
      `❌ Not a valid chosen platform. It's either "desktop" or "mobile".`
    );
  if (platform === "mobile") {
    const response = await handleMobile();
    return response;
  } else {
    const response = await desktop();
    return response;
  }
}
