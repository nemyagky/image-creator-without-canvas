import * as fs from "fs";
import { FontBitmap } from "./FontBitmap";
import { FontCharParams } from "./interfaces/font-char-params.interface";
const parseXMLFont = require("parse-bmfont-xml");
import * as bitmapDecoder from "bmp-js";

export const Font = new class FontSingleton {

   public chars: { [key: string]: FontCharParams };
   public bitmap: FontBitmap;

   constructor() {
      this.loadChars();
      this.loadBitmap();
   }

   /**
    * Загружаем и парсим XML шрифт. На выходе получаем объект со свойством chars, в котором хранятся
    * Настройки для букв
    */
   private loadChars() {
      const charsBinaryData = fs.readFileSync(__dirname + "/fonts/Arial.fnt");

      this.chars = parseXMLFont(charsBinaryData).chars;
   }

   /**
    * Преобразует BMP картинку шрифта в FontBitmap
    */
   private loadBitmap() {
      const binaryFontImage = fs.readFileSync(__dirname + "/fonts/Arial.bmp");
      const bitmapFontData = bitmapDecoder.decode(binaryFontImage);

      this.bitmap = new FontBitmap(bitmapFontData);
   }

}();
