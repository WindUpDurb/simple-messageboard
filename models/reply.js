"use strict";

var mongoose = require("mongoose");

var replySchema = new mongoose.Schema({
    poster : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
    originalPost : { type : mongoose.Schema.Types.ObjectId, ref : "Post"},
    likes : { type : Number },
    content : { type : String },
    date : { type : Date }

});

var Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;