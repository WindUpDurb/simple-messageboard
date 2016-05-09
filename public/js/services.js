"use strict";

var app = angular.module("test4App");

app.service("AuthenticationServices", function ($http) {

    this.login = function (credentials) {
      return $http({
          method : "POST",
          url : "/api/users/login",
          data : credentials
      })  
    };

    this.logout = function () {
        return $http({
            method : "DELETE",
            url : "/api/users/logout"
        })
    };
    
    this.loggedInState = function () {
        return $http.get("/api/users/profile")
    };

    this.registerNewAccount = function (newAccount) {
        return $http({
            method : "POST",
            url : "/api/users/register",
            data : newAccount
        })
    };
});

app.service("PostServices", function ($http) {

    this.getThread = function (threadID) {
        return $http({
            method : "GET",
            url : `/api/posts/${threadID}`
        })
    };

    this.replyToThread = function (replyObject, threadID) {
        return $http({
            method : "POST",
            url : `/api/posts/${threadID}`,
            data : replyObject
        })
    }

});