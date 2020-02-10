import { Font } from "./Font";
import { FontCharParams } from "./interfaces/font-char-params.interface";
import { Pixel } from "./interfaces/pixel.interface";

/**
 * По сути этот класс обрезает большое bmp изображение, оставляя лишь часть, где находится буква
 * Имеет внутри себя набор пикселей, с помощью которого в дальнейшем можно строить изображения
 */
export class BitmapChar {

   public pixels: Pixel[] = [];
   private charParams: FontCharParams;

   /**
    * Часть большого .bmp изображения, содержащая набор пикселей для конкретной буквы
    * @param charParams Настройки шрифта, полученные из .xml файла
    * @param fontBitmap Большая картинка шрифта, преобразованная в BitmapFont. Используется для выборки пикселя
    */
   constructor(char: string) {
      this.charParams = Font.chars[char];

      // Для каждого пикселя в BitmapChar находим соответствующий пиесель в BitmapFont
      for (let y = this.charParams.y; y < this.charParams.height; y++) {
         for (let x = this.charParams.x; x < this.charParams.x + this.charParams.width; x++) {
            const currentPixel = Font.bitmap.getPixel(x, y);

            this.pixels.push(currentPixel);
         }
      }
   }

   /**
    * Используется во время формирования конечного изображения. Берутся все пиксели в текущей линии по y
    * и вставляются в буффер
    */
   public getAllPixelsByY(y: number) {
      return this.pixels.slice(y * this.charParams.width, y * this.charParams.width + this.charParams.width);
   }
}
