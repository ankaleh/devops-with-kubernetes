const express = require('express')
const app = express()
const fs = require('fs')
const axios = require('axios')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') })

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(folderName, 'hash.txt')
const message = process.env.MESSAGE

console.log(message)
app.get('/', async (req, res) => {
    let hash = ''
    let pongs = 0
    try {
        hash = fs.readFileSync(filePath, 'utf8')
    } catch (err) {
        console.error(err)
        res.send('Tiedoston lukeminen ei onnistunut.')
    }
    try {
      const response = await axios.get('http://ping-pong-svc:2345/pingpong')
      pongs = response.data
    } catch (error) {
        console.log(error)
    }
      
    data = message.concat('<br/>', hash, '.<br/>Pongs: ', pongs)
    res.send(data)
})

const port = 5000

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})
