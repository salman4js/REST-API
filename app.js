const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
require('./notes')

app.use(bodyParser.json())

const Diary = mongoose.model("note")



const mongodbURI = "mongodb+srv://salman:pamelia@cluster0.0cr8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongodbURI,{
    useNewUrlParser : true,
})

mongoose.connection.on("connected",() => {
    console.log("Database connected");
})

mongoose.connection.on("error",(err) => {
    console.log("Some Stupid Error", err);
})

app.get("/", (req,res) =>{
    Diary.find({})
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/send', (req,res) => {
    const dailyNotes = new Diary({
        note : req.body.note,
        title : req.body.title
    })
    dailyNotes.save()
    .then(data => {
        console.log(data)
        res.send("Posted")
    }).catch(err => {
        console.log(err);
    })
})

app.post('/update', (req,res) => {
    Diary.findByIdAndUpdate(req.body.id,{
        note : req.body.note,
        title : req.body.title
    }).then(data => {
        console.log(data)
        res.send("Updated")
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/delete', (req,res) => {
    Diary.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send("Deleted")
    })
    .catch(err => {
        console.log(err)
    })
})



app.listen(3001,() => {
    console.log("Server is running!")
})