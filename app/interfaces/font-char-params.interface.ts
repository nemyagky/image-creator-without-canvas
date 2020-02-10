// Каждая буква имеет следующие настройки, получаемые из XML файла. Во время создания картинки
// PNG шрифт "обрезается" в соотвествии с настройками буквы
export interface FontCharParams {
   x: number;
   y: number;
   width: number;
   height: number;
   id?: number;
   xoffset?: number;
   yoffset?: number;
   xadvance?: number;
   page?: number;
   chnl?: number;
}
