var app = angular.module('planetApp', ['planetApp.mercuryCtrl']);
app.controller("mercuryCtrl", function($scope, $route) {
    $scope.planet = {
        name: 'Mercury',
        carbondioxide: 'Trace Amount',
        nitrogen: 'Trace Amount',
        oxygen: '42%',
        hydrogen: '22%'
    }
});