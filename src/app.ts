import express from 'express'
import cors from 'cors'

import { router } from './app/router'
import { getErrors } from './lib/errors'

import './database'
import './app/providers'

import 'express-async-errors'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(router)

app.use(getErrors)

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`)
})
