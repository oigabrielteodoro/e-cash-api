import express from 'express'
import cors from 'cors'

import './database'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`)
})
