const express = require('express')
const app = express()
const router = express.Router()
const contextPath = '/pingpong/'
const path = require('path')
const fs = require('fs')

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const fileToWrite = path.join(folderName, 'pongs.txt')

let counter = 0

const savePongs = () => {
    try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    try {
        fs.writeFileSync(fileToWrite, `${counter}`)
    } catch (err) {
        console.log(err)
    }
    
}

router.get('/', (req, res) => {
    
    counter += 1
    res.send(`Pong ${counter}`)
    savePongs()
})

app.use(contextPath, router)

const port = 8080
app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})