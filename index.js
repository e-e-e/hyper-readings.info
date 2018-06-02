const os = require('os')
const path = require('path')
const fs = require('fs')
const express = require('express')
const helmet = require('helmet')
const Manager = require('hyper-readings-manager')

const hrFolder = path.resolve(os.homedir(), './hyper-readings')
if (!fs.existsSync(hrFolder)) {
  fs.mkdirSync(hrFolder)
}
const manager = new Manager(hrFolder)

const app = express()

app.use(helmet())

app.use(express.static('public'))

app.get('/reading-lists', (req, res) => {
  res.json(manager.activeLists())
})

app.use((err, req, res, next) => {
  res.status(err.status).send('Eeek!', err.message)
})

app.listen(8080, () => console.log('App listening on port 8080!'))
