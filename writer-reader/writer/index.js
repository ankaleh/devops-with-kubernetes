const fs = require('fs')
const path = require('path')

const folderName = path.join('/', 'usr', 'src', 'app', 'files')
const fileToWrite = path.resolve(folderName, 'hash.txt')

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

const saveRandomString = (randomString) => {
    const date = new Date().toISOString()
    try {
        fs.writeFileSync(fileToWrite, `${date}: ${randomString}`)
        setTimeout(() => {
            saveRandomString(randomString)
        }, 5000)
    } catch (err) {
        console.log(err)
    }
    
}

const randomString = Math.random().toString(36).substring(2, 15)
        + '-' + Math.random().toString(36).substring(2, 6)
            + '-' + Math.random().toString(36).substring(2, 6)
                + '-' + Math.random().toString(36).substring(2, 15)

saveRandomString(randomString)