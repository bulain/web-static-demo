var app = angular.module("app", []);

var data = [];
for (var i = 0; i < 5; i++) {
    data.push({
        id : i,
        login : "login-" + i,
        nick : "王小-" + i,
        email : "bulain-" + i + "@gmail.com",
        active : "是"
    });
}

app.controller("loginCtrl", function($scope) {
    $scope.list = data;
    $scope.edit = function(i) {
        $scope.data = {
            id : data[i].id,
            login : data[i].login,
            nick : data[i].nick,
            email : data[i].email,
            active : data[i].active
        };
    };
    $scope.save = function() {
        if ($scope.data && $scope.data.id) {
            var d = data[$scope.data.id];
            d.login = $scope.data.login;
            d.nick = $scope.data.nick;
            d.email = $scope.data.email;
            d.active = $scope.data.active;
        } else {
            $scope.data.id = data.length;
            data.push({
                id : $scope.data.id,
                login : $scope.data.login,
                nick : $scope.data.nick,
                email : $scope.data.email,
                active : $scope.data.active
            });
        }
    };
});
