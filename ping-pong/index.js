require('dotenv').config()
const express = require('express')
const app = express()
const router = express.Router()
const contextPath = '/pingpong/'

const { Pool, Client } = require('pg')
const dbName = 'pingpong'

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD

if (!USER || !PASSWORD) throw new Error('Käyttäjänimi tai salasana puuttuu')

const connectionString = `postgres://${USER}:${PASSWORD}@postgres-svc:5432`

console.log(connectionString)

const client = new Client({
    connectionString
})

const pool = new Pool({
    connectionString
})

const createDatabase = () => {
    client.connect(err => {
        if (err) {
          console.error('Virhe muodostettaessa yhteyttä: ', err.stack)
        } else {
          console.log('Yhdistetty tietokantaan!')
        }
    })
    client.query(`DROP DATABASE IF EXISTS ${dbName};`, (err, res) => {
        if (err) throw err
    })

    client.query(`DROP TABLE IF EXISTS pongs;`, (err, res) => {
        if (err) throw err
    })

    client.query(`CREATE DATABASE ${dbName};`, (err, res) => {
        if (err) throw err
    })
    client.query(`CREATE TABLE pongs (
        name VARCHAR(30),
        count INT);`, (err, res) => {
            if (err) throw err
    })
    client.query(`INSERT INTO pongs (name, count) VALUES ($1, $2);`, ['pongsNow', 0], (err, res) => {
        if (err) throw err
        client.end()
    })
}

const executeQuery = async (query, parameters) => {
    console.log(parameters)
    try {
        const result = await pool.query(query, parameters)
        return result
    } catch (err) {
        console.log(err, query)
        throw err
    }
}

router.get('/', async (req, res) => {
    const pongsNow = 'pongsNow'
    const result = await executeQuery('SELECT count FROM pongs WHERE name=$1', [`${pongsNow}`])
    const count = parseInt(result.rows[0]['count'])+1
    await executeQuery('UPDATE pongs SET count=$1 WHERE name=$2', [`${count}`, `${pongsNow}`])
    res.send(`${count}`)
})

createDatabase()
app.use(contextPath, router)

const port = 8080
app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})