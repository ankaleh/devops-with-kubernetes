const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const contextPath = '/api/'
const router = express.Router()

const pathToFolder = path.join('/', 'usr', 'src', 'app', 'files')
const pathToFile = path.join(pathToFolder, 'image.jpg')

const todos = [{ name: 'Siivoa!'}, { name: 'Pese pyykit!'}, { name: 'Lue tenttikirja loppuun!'}]

app.use(express.json())
app.use(cors())

router.get('/todos', (req, res) => {
    res.json(todos)
})

router.post('/todos', async (req, res) => {
    const todo = req.body
    if (!req.body) {
        return res.status(400).json({
            error: 'Data puuttuu!'
        })
    }
    todos.push(todo)
    res.json(todos)
})

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

router.get('/image', async (req, res) => {
    await getPic()
    res.sendFile(pathToFile)
})

fetchNewPic()

app.use(contextPath, router)

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})