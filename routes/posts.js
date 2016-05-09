"use strict";

var express = require("express");
var router = express.Router();

var User = require("../models/user");
var Post = require("../models/post");
var Reply = require("../models/reply");

router.route("/")
    .post(function (request, response) {
        Post.initialPost(request.body, function (error) {
            if (error) response.status(400).send(error);
            response.send("Thread has been created");
        })
    })

router.route("/:postID")
    .get(function (request, response) {
        var postID = request.params.postID;
        Post.findById(postID, function (error, post) {
            if (error) response.status(400).send(error);
            response.send(post);
        }).populate("poster childrenPosts")
    })
    .post(function (request, response) {
        var postID = request.params.postID;
        var newReply = request.body;
        newReply.originalPost = postID;
        Reply.create(request.body, function (error1, newReplyData) {
            Post.findById(postID, function (error2, postData) {

                postData.childrenPosts.push(newReplyData._id);
                postData.save(function (error) {
                    if (error) response.status(400).send(error);
                    response.send("Reply Has Been Posted");
                })
            })
        })
    })




module.exports = router;