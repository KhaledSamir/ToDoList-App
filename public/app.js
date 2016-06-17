var app = angular.module("ToDoApp", []);

app.controller('TodoController', function ($scope, $http) {

    $scope.InsertData = function () {
        $http.post('/Todos/PostData', $scope.formData).success(function () {

            console.log('Data Posted!');
            
            ShowMessage($scope.formData.text + ' Task inserted!');

            $scope.formData = {};  /* Clear the data */
             
            $scope.GetTodos();

        }).error(function (err) {
            if (err)
                ShowMessage('eror Happened while getting the data');
        });
    }

    $scope.GetTodos = function () {
        $http.get('/Todos').success(function (data) {

            if (data.length === undefined)
                $scope.msg = "No Data to display!";

            $scope.list = data;

        }).error(function (err) {
            if (err)
                ShowMessage(err.message);
        });
    }

    $scope.DeleteTodo = function (id) {
        $http.delete(id).success(function (data) {
            ShowMessage('item has been deleted!');
            $scope.GetTodos();
        }).error(function (err) {
            console.log(err.message);
        });
    }

    var ShowMessage = function (msg) {
        var msgElem = document.getElementsByClassName("Message");
        $scope.msg = msg;
    }
});