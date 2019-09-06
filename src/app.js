const express = require('express')
const files = require('./routers/files')

const app = express()
app.use(express.json())
app.use(files)

module.exports = app