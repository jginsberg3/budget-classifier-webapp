const express = require('express')
const files = require('./routers/files')

const app = express()
app.use(express.json())  // tell express to auto-parse json
app.use(files)

module.exports = app