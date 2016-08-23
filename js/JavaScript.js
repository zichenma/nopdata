/// <reference path="angular.js" />

var app = angular.module('demo', ['ngRoute'])
                 .config(function ($routeProvider) {
                     $routeProvider.caseInsensitiveMatch = true;
                     $routeProvider
                     .when('/home', {
                         templateUrl: "Templates/home.html",
                         controller: "homeController"
                     })
                     .when('/chart', {
                         templateUrl: "Templates/chart.html",
                         controller: "chartController",
                     })
                     .when('/map', {
                         templateUrl: "Templates/map.html",
                         controller: "mapController"
                     })
                     .otherwise({
                         redirectTo:'/home'
                     })
                 })
                .controller("homeController", function ($scope) {
                    $scope.message = "Reading JSON Data";

                })
                .controller("chartController", function ($scope) {
                    
                })
                 .controller("mapController", function ($scope) {
                    
                 })
                
