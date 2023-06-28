import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import MongoAPI from './Mongo.js'
import jwt from 'jsonwebtoken'

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


// app.get('/admin/*', async (req, res, next) => {

//   try {
//       const token =
//           req.body.token || req.query.token || req.headers["x-access-token"];

//       if (!token) {
//           return res.status(403).send("A token is required for authentication");
//       }

//       const decoded = jwt.verify(token, tokenKey)
//       res.locals.accountId = decoded
//       if (await mongoApi.isAccountExist(decoded as string)) {
//           next()
//       } else {
//           return res.status(401).send("Invalid Token");
//       }


//   } catch (err) {
//       return res.status(401).send("Invalid Token");
//   }
// })

// app.delete('/admin/*', async (req, res, next) => {

//   try {
//       const token =
//           req.body.token || req.query.token || req.headers["x-access-token"];

//       if (!token) {
//           return res.status(403).send("A token is required for authentication");
//       }

//       const decoded = jwt.verify(token, tokenKey)
//       res.locals.accountId = decoded
//       if (await mongoApi.isAccountExist(decoded as string)) {
//           next()
//       } else {
//           return res.status(401).send("Invalid Token");
//       }


//   } catch (err) {
//       return res.status(401).send("Invalid Token");
//   }
// })

// app.post('/admin/*', async (req, res, next) => {

//   try {
//       const token =
//           req.body.token || req.query.token || req.headers["x-access-token"];

//       if (!token) {
//           return res.status(403).send("A token is required for authentication");
//       }

//       const decoded = jwt.verify(token, tokenKey)
//       res.locals.accountId = decoded
//       if (await mongoApi.isAccountExist(decoded as string)) {
//           next()
//       } else {
//           return res.status(401).send("Invalid Token");
//       }


//   } catch (err) {
//       return res.status(401).send("Invalid Token");
//   }
// })

// app.put('/admin/*', async (req, res, next) => {

//   try {
//       const token =
//           req.body.token || req.query.token || req.headers["x-access-token"];

//       if (!token) {
//           return res.status(403).send("A token is required for authentication");
//       }

//       const decoded = jwt.verify(token, tokenKey)
//       res.locals.accountId = decoded
//       if (await mongoApi.isAccountExist(decoded as string)) {
//           next()
//       } else {
//           return res.status(401).send("Invalid Token");
//       }


//   } catch (err) {
//       return res.status(401).send("Invalid Token");
//   }
// })





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




// ------------------------- public request -------------------------









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
