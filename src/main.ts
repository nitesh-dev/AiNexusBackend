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


app.post('/signin', async (req, res) => {
  try {
    const email = req.body.email as string
    const password = req.body.password as string

    const result = await mongoApi.getAccount(email)

    if (result != null) {

      if (result.password == password) {
        res.status(200).send({ id: result._id })
      } else {
        res.status(400).send('Wrong password!')
      }

    } else {
      res.status(400).send('No account found with this email')
    }

  } catch (error) {
    console.log(error)
    res.status(400).send('Bad Request')
  }
})

// ------------------------ protected request -----------------------




// ------------------------- public request -------------------------









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
