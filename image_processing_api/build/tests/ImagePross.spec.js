"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const resizeImages_1 = require("../utilities/resizeImages");
// create a request object
const request = (0, supertest_1.default)(index_1.default);
describe('Test Input Value', () => {
    const filename = 'santamonica';
    const width = '300';
    const height = '300';
    const outputPath = path_1.default.join('assets/', 'images/', 'thumb/', filename) + `${height}x${width}.jpg`;
    it('when you accses images resize page ', async () => {
        const response = await request.get('/images');
        expect(response.status).toBe(404);
    });
    it('when you input all value correct!  ', async () => {
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
    });
    it('when you input image not found in your file  ', async () => {
        const response = await request.get(`/api/images?filename=unkonw&width=${width}&height=${height}`);
        expect(response.text).toBe('Not find image!');
    });
    it('when you not input width ', async () => {
        const response = await request.get(`/api/images?filename=${filename}&width=&height=${height}`);
        expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!');
    });
    it('when you not input height ', async () => {
        const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=`);
        expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!');
    });
    it('when you not input height and width together', async () => {
        const response = await request.get(`/api/images?filename=${filename}&width=&height=`);
        expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!');
    });
});
describe('Testing image processing', () => {
    it('Resolves succesfully when provided the right filename, height and width parameters', async () => {
        await expectAsync((0, resizeImages_1.ResizeImages)('santamonica', 200, 200)).toBeResolved();
    });
    it('Rejected when provided the not right filename, height and width parameters', async () => {
        await expectAsync((0, resizeImages_1.ResizeImages)('unknow', 200, 200)).toBeRejected('Not find image!');
    });
});
