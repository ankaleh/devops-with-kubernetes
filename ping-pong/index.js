const express = require('express')
const app = express()
const router = express.Router()
const contextPath = '/pingpong/'
const path = require('path')
const fs = require('fs')

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const pathToPongs = path.join(folderName, 'pongs.txt')

const savePongs = async (pongs) => {
    try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    try {
        fs.writeFileSync(pathToPongs, `${pongs}`)
    } catch (err) {
        console.log(err)
    }
    
}

router.get('/', async (req, res) => {
    let pongs = 0
    try {
        pongs = fs.readFileSync(pathToPongs, 'utf8')
    } catch (err) {
        console.error(err)
        res.send('Pongs-tiedoston lukeminen ei onnistunut.')
    }
    res.send(`${pongs}`)
    pongs = parseInt(pongs) + 1
    savePongs(pongs)
})

app.use(contextPath, router)

savePongs(0)

const port = 8080
app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})