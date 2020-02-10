import * as bitmapDecoder from "bmp-js";
import { Pixel } from "./interfaces/pixel.interface";

/**
 * Во время создания принимает в себя buffer, полученный с помощью bitmapDecoder
 * С помощью этого буффера создает матрицу (bitmap)
 */
export class FontBitmap {

   public width: number;
   public height: number;
   private pixels: Pixel[] = [];

   /**
    * Большое изображение шрифта. Используется для того, чтобы получить набор пикселей для большого изобрражения
    * @param bitmapFontData Распаршенное с помощью bitmapDecoder изображение шрифта. Содержит в себе высоту, ширину и набор пикселей в изображении, закодированный в буффер
    */
   constructor(bitmapFontData: bitmapDecoder.BmpDecoder) {
      this.width = bitmapFontData.width;
      this.height = bitmapFontData.height;

      this.setPixelsFromBuffer(bitmapFontData.data);
   }

   /**
    * Возращает RGBA код пикселя по координатам x и y в изображении шрифта
    * @param x Координата X в изображении шрифта
    * @param y Координата Y в изображении шрифта
    */
   public getPixel(x: number, y: number): Pixel {
      // y - число от 0 до this.width
      // this.pixels.length = this.width * this.height
      // y * this.width - смещение по y. К этому смещению прибавляем x и получаем индекс пикселя
      return this.pixels[y * this.width + x];
   }

   private setPixelsFromBuffer(imageBuffer: Buffer) {
      for (let i = 0; i < imageBuffer.length; i += 4) {
         // bmp-js возращает данные в ABGR формате, поэтому записываем в обратном порядке
         this.pixels.push({
            r: imageBuffer[i + 3],
            g: imageBuffer[i + 2],
            b: imageBuffer[i + 1],
            a: imageBuffer[i]
         });
      }
   }
}
