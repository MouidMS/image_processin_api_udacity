"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeImagesThumb = exports.ResizeImages = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const ResizeImages = async (filename, height, width, pathImage = `./assets/images/${filename}.jpg`, input = path_1.default.resolve(pathImage)) => {
    return (0, sharp_1.default)(input).resize({ height, width }).toBuffer();
};
exports.ResizeImages = ResizeImages;
const ResizeImagesThumb = (filename, height, width, pathImage = `./assets/images/thumb/${filename}${height}x${width}.jpg`) => {
    return pathImage;
};
exports.ResizeImagesThumb = ResizeImagesThumb;
