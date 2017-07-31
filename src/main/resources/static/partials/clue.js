App.controller('clueController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal, Message) {

    var app = angular.module('app', []);
    /* 列表对象 */
    $scope.listObj = {
        data: null,
        selectData: [],
        allSelected: false,
        load: function() {
            var param = {};
            $http({
                url:'/ns/findAll',
                method:'POST',
                data:param,
            }).success(function (resp) {
                angular.forEach(resp, function(x, i) {		//加载初始化值
					x.selected = false;
					if (x.editStatus == "DRAFT" || x.editStatus == "SUBMIT") {
						x.editStatus = "未上传";
					}else if (x.editStatus == "LIBRARY") {
						x.editStatus = "已上传";
					};
				});
                $scope.listObj.data = resp;
            });
        },
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
        deleteClue:function (updateType) {
        	if (this.selectData.length == 0) {
//				Message.danger("请至少选择一个删除项!");
        		console.log("请至少选择一个删除项!");
			}else {
				var msg = "您真的确定要删除吗？\n\n请确认！";
				if (confirm(msg) == true) {
					angular.forEach($scope.listObj.selectData, function(at){
						var param = {
							id:at.id
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
					});
				}
			}
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

        updateAsset:function (updateType) {
            var param = {
                authorName:this.obj.authorName,
                content:this.obj.content,
                createdBy:this.obj.createdBy,
                clueName:this.obj.clueName,
                createdTime:new Date(),
                editStatus:updateType
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

    }



    //初始化函数
    $scope.init = function() {
        $scope.listObj.load();
    }
    $scope.init();


}]);