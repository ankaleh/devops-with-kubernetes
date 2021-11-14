const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const pathToFolder = path.join('/', 'usr', 'src', 'app', 'files')
const pathToFile = path.join(pathToFolder, 'image.jpg')

app.set('views', './views')
app.set('view engine', 'pug')

const todos = ['Siivoa!', 'Pese pyykit!', 'Lue tenttikirja loppuun!']

const port = 3000

const createFolder = async () => {
    try {
        if (!fs.existsSync(pathToFolder)) {
          fs.mkdirSync(pathToFolder)
        }
      } catch (err) {
        console.error(err)
      }
}

const getPic = async () => {
    const now = new Date()
    const testDate = new Date()
    testDate.setDate(testDate.getDate() + 3)
    const { birthtime } = fs.statSync(pathToFile)
    if (now.toDateString() > birthtime.toDateString()) {
        await fetchNewPic()
    }
}

const fetchNewPic = async () => {
    await createFolder()
    const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
    const writeStream = fs.createWriteStream(pathToFile, { flag: 'wx' })
    await response.data.pipe(writeStream)
    if (fs.existsSync(pathToFile)) {
        console.log("File exists:", pathToFile);
    } else {
        console.log("File DOES NOT exist:", pathToFile);
    }
}

app.get('/', async (req, res) => {
    await getPic()
    res.render('index', { todos: todos, title: 'DevOps with Kubernetes' , message: 'Työlista' })
})

app.use('/static', express.static(pathToFolder))

fetchNewPic()

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})