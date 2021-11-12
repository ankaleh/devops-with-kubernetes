const express = require('express')
const app = express()
const fs = require('fs')

const path = require('path')

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(folderName, 'hash.txt')

app.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        res.send(data)
      } catch (err) {
        console.error(err)
        res.send('Tiedoston lukeminen ei onnistunut.')
      }
})

const port = 5000

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})
