"use strict";

var mongoose = require("mongoose");
var moment = require("moment");

var postSchema = new mongoose.Schema({
   poster : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
   postTitle : { type : String },
   childrenPosts : [{ type : mongoose.Schema.Types.ObjectId, ref : "Reply"}], 
   likes : { type : Number, default : 0 },
   content : { type : String },
   date : { type : Date, default : Date.now }
});

postSchema.statics.initialPost = function (postObject, callback) {
    //postObject.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    Post.create(postObject, function (error) {
        callback(error);
    })
};

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
