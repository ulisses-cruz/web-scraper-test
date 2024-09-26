import 'dotenv/config'
import { startServer } from './server'

const port = Number(process.env.PORT)

startServer(port)
