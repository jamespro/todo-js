const express = require('express')
const app = express()
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(error => console.log(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('todojs').find().sort({priority:-1}).toArray()
        .then(data => {
        res.render('index.ejs',{info:data})
        })
    .catch(error => console.error(error))
})

app.post('/addTodo', (req, res) => {
    db.collection('todojs').insertOne({ description: req.body.description, priority: req.body.priority, done: false })
        .then(result => {
            console.log('Todo Added!')
            res.redirect('/')
        })
        .catch(error => console.error(error))
})
    
app.delete('/deleteTodo', (req, res) => {
    db.collection('todojs').deleteOne({ _id: new mongo.ObjectId(req.body.id) })
        .then(result => {
            console.log('Todo Deleted')
            res.json('Todo Deleted')
        })
    .catch(error => console.error(error))
})

app.put('/updatePriority', (req, res) => {
    
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
