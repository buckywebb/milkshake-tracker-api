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

        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())


        app.get('/', (req, res) => {
            milkshakeCollection
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', {flavors: results})
                })
                .catch(error => console.error(error))
        })

        app.post('/flavors', (req, res) => {
            milkshakeCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/flavors', (req, res) => {
            milkshakeCollection
                .findOneAndUpdate(
                    {flavor: 'Walnut'},
                    {
                        $set: {
                            flavor: req.body.flavor,
                            rating: req.body.rating,
                        },
                    },
                    {
                        upsert: true,
                    }
                )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))