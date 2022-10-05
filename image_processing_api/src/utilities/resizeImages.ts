import sharp from 'sharp'
import path from 'path'

const ResizeImages = async (
  filename: string,
  height: number,
  width: number,
  pathImage = `./assets/images/${filename}.jpg`,
  input: string = path.resolve(pathImage)
): Promise<Buffer> => {
  return sharp(input).resize({ height, width }).toBuffer()
}

const ResizeImagesThumb = (
  filename: string,
  height: number,
  width: number,
  pathImage = `./assets/images/thumb/${filename}${height}x${width}.jpg`
): string => {
  return pathImage
}
export { ResizeImages, ResizeImagesThumb }
