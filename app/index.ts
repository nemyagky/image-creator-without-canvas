import { ImageGenerator } from "./ImageGenerator";

const imageString = process.argv[2];

if (imageString) {
   ImageGenerator.createImage(imageString);
} else {
   console.error("Пожалуйста, укажите аргументы после команды generate-image-with");
}
