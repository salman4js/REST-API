const mongoose = require('mongoose');

const Notes = new mongoose.Schema({
    note : String,
    title : String
})

mongoose.model("note", Notes )