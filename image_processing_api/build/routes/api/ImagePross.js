"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImages_1 = require("../../utilities/resizeImages");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fs_2 = require("fs");
const routes = express_1.default.Router();
routes.get('/images', async (req, res) => {
    //Three variables are used
    const filename = req.query.filename;
    const height = parseInt(req.query.height);
    const width = parseInt(req.query.width);
    //The process of checking input variables
    //Check if there is an image in the Thumb file or not
    const imageThumbPath = (0, resizeImages_1.ResizeImagesThumb)(filename, height, width);
    //Check if the original image exists or not
    const ImageOriginalPath = path_1.default.join('assets/', 'images/', filename + '.jpg');
    //Check if the input height and width is correct or incorrect
    const heightAndWidth = width > 0 && height > 0;
    //Check if the file name is spelled correctly
    const ckInputFilename = Object.keys(filename || {}).length != 0;
    //Comprehensive check after collecting results
    if (ckInputFilename == true && heightAndWidth == true) {
        if (fs_1.default.existsSync(ImageOriginalPath)) {
            //Check if the original image exists or not
            if (!fs_1.default.existsSync(imageThumbPath)) {
                //If there is, but there is no scaling image in the Thumb file, create it immediately
                const resizedImage = await (0, resizeImages_1.ResizeImages)(filename, height, width);
                await fs_2.promises.writeFile(imageThumbPath, resizedImage);
            }
            else {
                res.sendFile(path_1.default.resolve(imageThumbPath));
            }
        }
        else {
            res.status(404);
            res.send('Not find image!');
        }
    }
    else {
        res.status(400);
        res.send('Make Sure You Are Input Filename And Width And Height!');
    }
});
exports.default = routes;
