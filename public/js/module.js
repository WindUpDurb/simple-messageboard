"use strict";

var app = angular.module("test4App", ["ui.router", "ngCookies"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url : "/",
            controller : "homeController",
            templateUrl : "/html/home.html"
        })
        .state("registration", {
            url : "/register",
            controller : "registrationController",
            templateUrl : "/html/registration.html"
        })
        .state("editProfile", {
            url : "/editProfile",
            controller : "editProfileController",
            templateUrl : "/html/editProfile.html"
        })
        .state("messageBoards", {
            url : "/messageBoards",
            controller : "messageBoardsController",
            templateUrl : "/html/messageBoard.html"
        })
        .state("thread", {
            url : "/messageBoards/:threadID",
            controller : "threadController",
            templateUrl : "/html/thread.html"
        })

    $urlRouterProvider.otherwise("/");
});