declare interface Wallpaper {
  title?: string;
  url?: string;
}

export default class BaseCollection {
  /**
   * *Resolution & Image quality*
   * - This function returns a array of wallpapers of a specific pornStar, however there are some cons.
   * The image quality is mediocre, though if you want to save a picture in high level quality you need to manually follow some steps.
   * 1) Increase size of the picture, you can do this by heading over to [ImageEnlarger](https://www.imageenlarger.com/)
   * - Drop the image/Upload the image
   * - Choose the zoom factor to 2.5
   * - Select the filter "Lanczos3" (recommended) and download it.
   * 2) Clear the photo/Make the photo sharpen, head over to [PicWish](https://picwish.com/unblur-image-portrait)
   * - Drag and drop the picture & wait for it to removed all the blurry particle.
   * - Once it's done simply download it.
   */
  public async getWallpaper(query: string): Promise<string[]>;
  /**
   * @since 11-04-2023
   */
  public async getHentaiWallpaper(): Promise<string[]>;
  public async getRandomWallpaper(platform: string): Promise<Wallpaper>;
}
