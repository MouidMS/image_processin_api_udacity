import path from 'path'
import supertest from 'supertest'
import app from '../index'
import fs from 'fs'
import { ResizeImages } from '../utilities/resizeImages'

// create a request object
const request = supertest(app)

describe('Test Input Value', () => {
  const filename = 'santamonica'
  const width = '300'
  const height = '300'
  const outputPath = path.join('assets/', 'images/', 'thumb/', filename) + `${height}x${width}.jpg`

  it('when you accses images resize page ', async () => {
    const response = await request.get('/images')
    expect(response.status).toBe(404)
  })

  it('when you input all value correct!  ', async () => {
    expect(fs.existsSync(outputPath)).toBeTrue()
  })

  it('when you input image not found in your file  ', async () => {
    const response = await request.get(
      `/api/images?filename=unkonw&width=${width}&height=${height}`
    )
    expect(response.text).toBe('Not find image!')
  })

  it('when you not input width ', async () => {
    const response = await request.get(`/api/images?filename=${filename}&width=&height=${height}`)
    expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!')
  })

  it('when you not input height ', async () => {
    const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=`)
    expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!')
  })

  it('when you not input height and width together', async () => {
    const response = await request.get(`/api/images?filename=${filename}&width=&height=`)
    expect(response.text).toBe('Make Sure You Are Input Filename And Width And Height!')
  })
})

describe('Testing Funcation Images', () => {
  it('when you input right parameters and succesfully', async () => {
    await expectAsync(ResizeImages('santamonica', 200, 200)).toBeResolved()
  })

  it('when you input not right parameters and fail', async () => {
    await expectAsync(ResizeImages('unknow', 200, 200)).toBeRejected('Not find image!')
  })
})
