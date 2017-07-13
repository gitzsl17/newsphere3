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

    $scope.condition = {
        columnNameArr:{
            1:"栏目1",
            2:"栏目2",
            3:"栏目3",
            4:"栏目4"
        },
        newsDomain:{
            1:"时政",
            2:"军事",
            3:"民生",
            4:"政治"
        }
    }

    $scope.ClueEditor = {
        isNew:false,
        obj:null,
        listObj:null,

        selectData: [],
        allSelected: false,
        selected: function(at, e) {
            e.stopPropagation();
            at.selected = !at.selected;
            if (at.selected) {
                this.obj = angular.copy(at);
                this.flagObj = at;
                this.selectData.push(at);
            }else {
                for (var i = 0; i <= this.selectData.length - 1; i++) {
                    var item = this.selectData;
                    if (!item[i].selected) {
                        this.selectData.splice(i,1);
                    }
                }
            }
            console.log(this.selectData);
        },

        allchecked: function() {
            if(!this.allSelected) {
                angular.forEach(this.data, function(item, index) {
                    item.selected = true;
                    $scope.listObj.selectData.splice(index,1,item);
                });
            } else {
                angular.forEach(this.data, function(item, index) {
                    item.selected = false;
                });
            }
            this.allSelected = !this.allSelected;
        },

        createNew:function () {
            this.isNew = true;
            this.obj = {
                clueName:'',
                authorName:'',
                createdBy:'',
                createdTime:new Date(),
            }
        },

        cancel:function () {
            this.obj = null;
            this.isNew = false;
        },

        updateAsset:function (Type) {
            var param = {
                authorName:this.obj.authorName,
                content:this.obj.content,
                createdBy:this.obj.createdBy,
                clueName:this.obj.clueName,
                createdTime:new Date(),
                editStatus:Type
            };
            $http({
                url:'/ns/add',
                method:'POST',
                data:param,
            }).success(function (resp) {
                $scope.message = resp;
                $scope.ClueEditor.cancel();
                $timeout(function() {
                    $scope.listObj.load();
                }, 1000);
            });
        },

        delete:function (deleteById) {
            var param = {

            };
            $http({
                url:'/ns/delete',
                method:'POST',
                data:param,
            }).success(function (resp) {
                $scope.message = resp;
                $timeout(function() {
                    $scope.listObj.load();
                }, 1000);
            });
        }
    }



    //初始化函数
    $scope.init = function() {
        $scope.listObj.load();
    }
    $scope.init();


}]);