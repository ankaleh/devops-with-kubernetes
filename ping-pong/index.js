const express = require('express')
const app = express()
const router = express.Router()
const contextPath = '/pingpong/'

let counter = 0

router.get('/', (req, res) => {
    counter += 1
    res.send(`Pong ${counter}`)
})

app.use(contextPath, router)
const port = 8080
app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})