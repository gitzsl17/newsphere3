App.controller('clueController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal) {

    /* 列表对象 */
    $scope.listObj = {
        data: null,
        load: function() {
            $http.get("json/myTopic-item.json").success(function(resp) {
                $scope.listObj.data = resp.data;
            });
        },
        showDetail: function(row) {
            $scope.topicObj.data = row;
            $scope.topicObj.show = true;
        },
        submit: function() { //提交
            //TODO
            console.log("submit");
        },
    }


    //初始化函数
    $scope.init = function() {
        $scope.listObj.load();

    }
    $scope.init();


}]);