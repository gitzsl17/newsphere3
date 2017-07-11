App.controller('clueController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal) {

    var app = angular.module('app', []);
    /* 列表对象 */
    $scope.listObj = {
        data: null,
        load: function() {
            var param = {};
            $http({
                url:'/ns/findAll',
                method:'POST',
                data:param,
            }).success(function (resp) {
                $scope.listObj.data = resp;
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
        createNew: function () {
            $scope.ClueEditor.createNew();
        }
    }

    $scope.ClueEditor = {
        isNew:false,
        obj:null,
        listObj:null,
        createNew:function () {
            this.isNew = true;
            this.obj = {
                clueName:'',
                authorName:'',
                createdBy:'',
                createdTime:new Date(),
            }
        },
    }



    //初始化函数
    $scope.init = function() {
        $scope.listObj.load();
    }
    $scope.init();


}]);