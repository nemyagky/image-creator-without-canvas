import * as bitmapEncoder from "bmp-js";
import * as fs from "fs";
import { BitmapChar } from "./BitmapChar";
import { Font } from "./Font";
import { BitmapData } from "./interfaces/bitmap.interface";

export const ImageGenerator = new class ImageGeneratorSingleton {

   /**
    * Глобальная идея заключается в том, чтобы распарсить .bmp шрифт на пиксели, и затем из полученных пикселей создать
    * готовое изображение
    */
   public createImage(string: string) {
      const bitmapChars: BitmapChar[] = this.stringToBitmapChars(string);

      this.createImageFromBitmapChars(bitmapChars);
   }

   private stringToBitmapChars(string: string): BitmapChar[] {
      const bitmapCharsArray: BitmapChar[] = [];

      string.split("").forEach((char: string) => {
         bitmapCharsArray.push(new BitmapChar(char));
      });

      return bitmapCharsArray;
   }

   private createImageFromBitmapChars(bitmapChars: BitmapChar[]) {

      const newImageBitmap: BitmapData = {
         data: undefined,
         width: undefined,
         height: undefined
      };

      newImageBitmap.height = Font.bitmap.height;
      // Высчитываем количество пикселей в новом изображении и делим на его высоту
      newImageBitmap.width = Math.ceil
         (
            bitmapChars.reduce((sum: number, char: BitmapChar) => sum + char.pixels.length, 0) / newImageBitmap.height
         );

      const newImageNumbericBitmap: number[] = this.createImageNumbericBuffer(bitmapChars, newImageBitmap.height);
      newImageBitmap.data = Buffer.from(newImageNumbericBitmap);

      const newImage = bitmapEncoder.encode(newImageBitmap).data;
      fs.createWriteStream("image.png").write(newImage);
   }

   /**
    * Строит итоговое изображение объединяя пиксели в bitmapChars
    * @param bitmapChars массив BitmapChar
    * @param imageHeight высота нового изображения
    * @returns Массив значений от 0 до 255, с помощью которого можно построить изображение
    */
   private createImageNumbericBuffer(bitmapChars: BitmapChar[], imageHeight: number) {
      const newImageNumbericBuffer: number[] = [];

      // Строим готовое изображение сверху вниз
      for (let y = 0; y <= imageHeight; y++) {
         bitmapChars.forEach((char) => {
            // Получаем линию пикселей для текущей буквы на текущей горизонтали и добавляем ее в буффер
            const pixelsInRow = char.getAllPixelsByY(y);

            pixelsInRow.forEach((pixel) => {
               newImageNumbericBuffer.push(pixel.a, pixel.b, pixel.g, pixel.r);
            });
         });
      }

      return newImageNumbericBuffer;
   }

}();
