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

app.set('view-engine', 'ejs')

app.use(helmet())

app.use(express.static('public'))

app.get('/reading-lists', (req, res) => {
  res.json(manager.activeLists())
})

app.get('/', (req, res) => {
  res.render('index.html.ejs', { lists: manager.activeLists() })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send('Eeek!' + err.message)
})

app.listen(8080, () => console.log('App listening on port 8080!'))
