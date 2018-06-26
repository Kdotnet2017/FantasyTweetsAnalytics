(function () {
    'use strict';
    var app = angular.module("FTAapp", []);

    app.controller("FTActrl", ["$scope", "$http", function ($scope, $http) {

        var refresh = function () {
            $http.get("/api/twitters").then(function (response) {
                $scope.tweets = response.data;
            });
        }
        refresh();
        $scope.analyzeTwitter = function () {
            console.log($scope.twitterId);
            var data = { twitterId: $scope.twitterId };
            $http.post('/api/twitters', JSON.stringify(data)).then(function (response) {

                if (response.data) {
                    refresh();
                    console.log("Post Data Submitted Successfully!");
                }

            }, function (response) {

                console.log("Service not Exists");
            });
        };
    }]);

})();