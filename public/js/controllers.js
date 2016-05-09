"use strict";

var app = angular.module("test4App");

app.controller("homeController", function ($scope, $cookies, AuthenticationServices) {
    console.log("Home Controller");


    AuthenticationServices.loggedInState()
        .then(function (response) {
            $scope.activeUser = response.data;
            console.log("Active USer: ", $scope.activeUser)
        })
        .catch(function () {
            $scope.activeUser = null;
        })


    $scope.submitLogin = function (credentials) {
        console.log(credentials)
        AuthenticationServices.login(credentials)
            .then(function (response) {
                console.log(response.data);
                return AuthenticationServices.loggedInState()
            })
            .then(function (response) {
                $scope.activeUser = response.data
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

    $scope.submitLogout = function () {
        AuthenticationServices.logout()
            .then(function (response) {
                $scope.activeUser = null;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }

});

app.controller("registrationController", function ($scope, $state, AuthenticationServices) {
   console.log("Registration")

    $scope.submitRegistration = function (newAccount) {
        if (newAccount.password !== newAccount.passwordConfirm) {
            alert("Passwords Must Match");
        } else {

            AuthenticationServices.registerNewAccount(newAccount)
                .then(function (response) {
                    alert("Your account has been created");
                    $state.go("home");
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                })

        }
    };

});

app.controller("messageBoardsController", function () {
    console.log("Message Boards");
});

app.controller("threadController", function (PostServices, $scope, $stateParams) {
    console.log("Message Board Controller");

    console.log("params: ", $stateParams.threadID)

    PostServices.getThread($stateParams.threadID)
        .then(function (response) {
            $scope.currentThread = response.data;
            console.log(response.data)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    
    $scope.submitReply = function (newReply) {
        var threadID = $stateParams.threadID;
        var toReplyWith = angular.copy(newReply);
        toReplyWith.poster = $scope.activeUser;
        PostServices.replyToThread(toReplyWith, threadID)
            .then(function (response) {
                alert("Reply has been made. Please Reload.");
                $scope.newReply.content = null;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    }

});


app.controller("editProfileController", function () {
    console.log("Edit Profile Controller")
})