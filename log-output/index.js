const express = require('express')
const app = express()

const randomString = Math.random().toString(36).substring(2, 15)
        + '-' + Math.random().toString(36).substring(2, 6)
            + '-' + Math.random().toString(36).substring(2, 6)
                + '-' + Math.random().toString(36).substring(2, 15)

app.get('/', (req, res) => {
    date = new Date().toISOString()
    res.send(`${date}: ${randomString}`)
})

const port = 5000

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})
