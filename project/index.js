const express = require('express')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

const port = 3000
app.get('/', (req, res) => {
    res.render('index', { title: 'DevOps with Kubernetes' , message: 'Hei, maailma!'})
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})