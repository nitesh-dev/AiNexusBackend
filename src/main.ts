import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import MongoAPI from './Mongo.js'
import jwt from 'jsonwebtoken'
import { AiDetail } from './DataType.js'
import { generateId, getCurrentTime } from './Utils.js'

dotenv.config()

const atlas = process.env.ATLAS_URI || '';
const port = process.env.EXPRESS_PORT || 3001
const tokenKey = process.env.TOKEN_KEY || 'test'

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



app.post('/admin/*', async (req, res, next) => {

  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, tokenKey)
    res.locals.accountId = decoded

    if (await mongoApi.isAdmin(decoded as string)) {
      next()
    } else {
      return res.status(401).send("Invalid Token");
    }


  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
})

app.get('/admin/*', async (req, res, next) => {

  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, tokenKey)
    res.locals.accountId = decoded

    if (await mongoApi.isAdmin(decoded as string)) {
      next()
    } else {
      return res.status(401).send("Invalid Token");
    }


  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
})

app.delete('/admin/*', async (req, res, next) => {

  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, tokenKey)
    res.locals.accountId = decoded

    if (await mongoApi.isAdmin(decoded as string)) {
      next()
    } else {
      return res.status(401).send("Invalid Token");
    }


  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
})

app.put('/admin/*', async (req, res, next) => {

  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, tokenKey)
    res.locals.accountId = decoded

    if (await mongoApi.isAdmin(decoded as string)) {
      next()
    } else {
      return res.status(401).send("Invalid Token");
    }

  } catch (err) {
    return res.status(401).send("Invalid Token");
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

      // check password is correct or not
      if (result.password == password) {

        // create token for auth
        const token = jwt.sign(result._id, tokenKey)
        res.status(200).send({ token: token })
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

app.get('/admin/dashboard/:page_num', async (req, res) => {
  console.log('dashboard data requested')
  try {
    const pageNum = parseInt(req.params.page_num) 
    const result = await mongoApi.dashboard(pageNum, 50)

    if (result != null) {
      res.status(200).send(result)
    } else {
      res.status(400).send('Bad Request')
    }


  } catch (error) {
    console.log(error)
    res.status(400).send('Bad Request')
  }
})

app.get('/admin/dashboard/search', async (req, res) => {
  
})

app.post('/admin/addAi', async (req, res) => {

  console.log('add new ai requested')
  try {
    const data = req.body.data as AiDetail
    const aiData: AiDetail = {
      _id: generateId(),
      name: data.name,
      icon_url: data.icon_url,
      site_url: data.site_url,
      type: data.type,
      plans: data.plans,
      description: data.description,
      content: data.content,
      likes: 0,
      views: 0,
      created_at: getCurrentTime(),
      modified_at: 0,
      seo_description: data.seo_description
    }

    const result = await mongoApi.addAi(aiData)

    if (result != null) {
      res.status(200).send('Added successfully')
    } else {
      res.status(400).send('Bad Request')
    }


  } catch (error) {
    console.log(error)
    res.status(400).send('Bad Request')
  }
})


app.delete('/admin/delete/:id', async (req, res) => {
  console.log('delete ai requested')
  try {
    const id = req.params.id
    const result = await mongoApi.deleteAi(id)

    if (result != null) {
      res.status(200).send('Deleted successfully')
    } else {
      res.status(400).send('Bad Request')
    }

  } catch (error) {
    console.log(error)
    res.status(400).send('Bad Request')
  }
})


app.put('/admin/update', async (req, res) => {
  console.log('update ai requested')
  try {
    const data = req.body.data as AiDetail
    const aiData: AiDetail = {
      _id: data._id,
      name: data.name,
      icon_url: data.icon_url,
      site_url: data.site_url,
      type: data.type,
      plans: data.plans,
      description: data.description,
      content: data.content,
      likes: 0,
      views: 0,
      created_at: 0,
      modified_at: getCurrentTime(),
      seo_description: data.seo_description
    }
    const result = await mongoApi.updateAi(aiData)

    if (result != null) {
      res.status(200).send('Updated successfully')
    } else {
      res.status(400).send('Bad Request')
    }

  } catch (error) {
    console.log(error)
    res.status(400).send('Bad Request')
  }
})



// ------------------------- public request -------------------------









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
