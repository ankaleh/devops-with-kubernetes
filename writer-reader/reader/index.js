const express = require('express')
const app = express()
const fs = require('fs')

const path = require('path')

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(folderName, 'hash.txt')
const pathToPongs = path.join(folderName, 'pongs.txt')

app.get('/', (req, res) => {
    let hash = ''
    let pongs = 0
    try {
        hash = fs.readFileSync(filePath, 'utf8')
      } catch (err) {
        console.error(err)
        res.send('Tiedoston lukeminen ei onnistunut.')
      }
    try {
        pongs = fs.readFileSync(pathToPongs, 'utf8')
      } catch (err) {
        console.error(err)
        res.send('Pongs-tiedoston lukeminen ei onnistunut.')
      }
      data = hash.concat('.\nPongs: ', pongs)
      res.send(data)
})

const port = 5000

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})
