import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'


dotenv.config()

const port = process.env.EXPRESS_PORT || 3001

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// --------------------- middleware ---------------------------







// ----------------------- request --------------------------

app.get('/', (req, res) => {
  res.send('Hello welcome back! Server is working')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
