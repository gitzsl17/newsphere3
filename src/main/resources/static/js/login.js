var App = angular.module("myApp", ["ngResource", "ngRoute", 'ngAnimate', 'angularUUID2', 'angularFileUpload', 'ui.bootstrap']);
App.controller('loginController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal) {

    // var app = angular.module('app', []);
    console.log("222")
    $scope.login = {
        submit:function () {
            window.location.href = 'http://127.0.0.1:8081/ns/#/clue';
        }
    }

}])