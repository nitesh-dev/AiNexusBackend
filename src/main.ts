import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import MongoAPI from './Mongo.js'

dotenv.config()

const atlas = process.env.ATLAS_URI || '';
const port = process.env.EXPRESS_PORT || 3001

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// connection to mongo db
const mongoApi = new MongoAPI()
let isMongoConnected = await mongoApi.connectMongoose(atlas)


// --------------------- middleware ---------------------------

app.use((req, res, next) => {
  if (!isMongoConnected) {
    res.status(503).send("Database connection error")
  } else {
    next()
  }
})





// ----------------------- request --------------------------

app.get('/', (req, res) => {
  res.send('Hello welcome back! Server is working')
})


// ------------------------ protected request -----------------------




// ------------------------- public request -------------------------









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
