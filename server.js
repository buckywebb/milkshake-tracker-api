const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://buckywebb:hBp7zkVeOwIXSNrf@cluster01.uqiuzgm.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('milkshake-tracker')
        const milkshakeCollection = db.collection('flavors')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/flavors', (req, res) => {
            milkshakeCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))