import express from 'express'
import cors from 'cors'
import { errors as celebrateErrors } from 'celebrate'

import { router } from './app/router'
import { getErrors } from './lib/errors'

import './database'
import './app/providers'

import 'express-async-errors'

const PORT = process.env.PORT

const app = express()

const whitelist = ['http://localhost:3000', 'https://ecash.vercel.app']

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: whitelist,
  }),
)

app.use(router)

app.use(celebrateErrors())
app.use(getErrors)

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`)
})
