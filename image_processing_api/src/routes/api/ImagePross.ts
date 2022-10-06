import { ResizeImages, ResizeImagesThumb } from '../../utilities/resizeImages'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { promises as fsPromises } from 'fs'

const routes = express.Router()

routes.get('/images', async (req: express.Request, res: express.Response): Promise<void> => {
  //Three variables are used
  const filename = req.query.filename as string
  const height = parseInt(req.query.height as unknown as string)
  const width = parseInt(req.query.width as unknown as string)
  //The process of checking input variables

  //Check if there is an image in the Thumb file or not
  const imageThumbPath: string = ResizeImagesThumb(filename, height, width)
  //Check if the original image exists or not
  const ImageOriginalPath: string = path.join('assets/', 'images/', filename + '.jpg')
  //Check if the input height and width is correct or incorrect
  const heightAndWidth: boolean = width > 0 && height > 0
  //Check if the file name is spelled correctly
  const ckInputFilename = Object.keys(filename || {}).length != 0

  //Comprehensive check after collecting results
  if (ckInputFilename == true && heightAndWidth == true) {
    if (fs.existsSync(ImageOriginalPath)) {
      //Check if the original image exists or not
      if (!fs.existsSync(imageThumbPath)) {
        //If there is, but there is no scaling image in the Thumb file, create it immediately
        const resizedImage = await ResizeImages(filename, height, width)
        await fsPromises.writeFile(imageThumbPath, resizedImage)
        res.sendFile(path.resolve(imageThumbPath))
      } else {
        res.sendFile(path.resolve(imageThumbPath))
      }
    } else {
      res.status(404)
      res.send('Not find image!')
    }
  } else {
    res.status(400)
    res.send('Make Sure You Are Input Filename And Width And Height!')
  }
})

export default routes
