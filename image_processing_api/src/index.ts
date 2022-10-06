import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import routes from './routes/api/ImagePross'
//import morgan from 'morgan'

dotenv.config()
const app: express.Application = express()
const PORT = 3000

// HTTP request logger middleware
//app.use(morgan('short'))

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World 🌍')
})

app.use('/api', routes)

// start express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${PORT}/`)
})

export default app
