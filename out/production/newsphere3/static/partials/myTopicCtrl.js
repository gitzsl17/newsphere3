App.controller('mytopicController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal) {

		/* 操纵高度 */
		$scope.$watch("mytopicList.randomNum", function(newVal, oldVal) {
			if(newVal == oldVal) {
				return;
			}

			var time = $timeout(function() {
				var height = angular.element('.sort')[0].offsetTop;
				$scope.mytopicList.loseHeight = parseInt(height);
				$timeout.cancel(time);
			}, 50)
		})

		/* 刷新筛选条件 */
		$scope.$watch("condition.filter", function(newVal, oldVal) {
			if(newVal == oldVal) {
				return;
			}

			angular.forEach($scope.condition.filter, function(item, index) {
				if(item.data instanceof Array) {
					var dataStr = ""
					angular.forEach(item.data, function(x) {
						dataStr += x + ";";
					})
					item.data = dataStr;
				}
			})
		}, true)

		//Nsearch发生变化 刷新列表
		$scope.$watch("Nsearch", function(newVal, oldVal) {
			if(newVal == oldVal) {
				return;
			}

			$scope.mytopicList.load();
		}, true)

		//获取当前月第一天
		$scope.getCurrentMonthFirst = function() {
			var date = new Date();
			date.setDate(1);
			return date;
		}

		//获取当前月最后一天
		$scope.getCurrentMonthLast = function() {
			var date = new Date();
			var currentMonth = date.getMonth();
			var nextMonth = ++currentMonth;
			var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
			var oneDay = 1000 * 60 * 60 * 24;
			return new Date(nextMonthFirstDay - oneDay);
		}

		$scope.Modal = {
			show: function() {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: './template/popselectmodal.html',
					controller: 'selectmodalCtrl',
					backdrop: 'static',
					resolve: {}
				});
				var result = "";
				modalInstance.result.then(function(selected) {
					alert(selected);
				}, function() {

				});
			}
		}

		$scope.Nsearch = {
			"ft": null,
			"group": {
				"allOf": [{ //资产模型ID
					"categoryId": {
						"EQ": ["acid-service-topic"]
					}
				}, {
					"categoryType": { //资产模型类型
						"EQ": ["TYPE_TOPIC"]
					}
				}, {
					"type": { // 资产类型 
						"EQ": ["Asset"]
					}
				}, {
					"deleteFlag": { //删除标识
						"EQ": ["Normal"]
					}
				}]
			},
			"orders": [{
				"extraData.proposedPublishTo": "ASC"
			}],
			"types": {},
			"facets": {},
			"start": 1,
			"limit": 20
		}
		
		/*日期格式formate*/
		Date.prototype.format =function(format) {
			var o = {
				"M+" : this.getMonth() + 1, //month
				"d+" : this.getDate(), //day
				"h+" : this.getHours(), //hour
				"m+" : this.getMinutes(), //minute
				"s+" : this.getSeconds(), //second
				"q+" : Math.floor((this.getMonth() + 3 ) / 3), //quarter
				"S" : this.getMilliseconds() //millisecond
			};
			if(/(y+)/.test(format)){
				format=format.replace(RegExp.$1, (this.getFullYear() + "").substr( 4 - RegExp.$1.length));
			}
				
			for(var k in o)if(new RegExp("("+ k +")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
			return format;
		};

		/* 条件对象 */
		$scope.condition = {
			/* 初始化条件 */
			data: [{
				"type": "breed",
				"name": "分类",
				"data": ["时政", "民生", "财经"],
				"selfShow": true,
				"multi": false,
				"expanded": false
			}, {
				"type": "state",
				"name": "状态",
				"data": ["草稿", "待审", "退回", "通过"],
				"selfShow": true,
				"multi": false,
				"expanded": false
			}, {
				"type": "channel",
				"name": "发布渠道",
				"data": ["电视", "微博", "微信", "APP", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"],
				"selfShow": true,
				"multi": false,
				"expanded": false
			}, {
				"type": "tags",
				"name": "标签",
				"data": ["民生", "体育", "教育"],
				"selfShow": true,
				"multi": false,
				"expanded": false
			}],
			moreShow: false, //更多条件是否显示
			moreCtrl: function() { //是否显示更多
				this.moreShow = !this.moreShow;
				$scope.mytopicList.randomNum = Math.random();
			},
			time: [{
				id: "none",
				option: '不限',
				active: true
			}, {
				id: "today",
				option: '今天',
				active: false
			}, {
				id: "week",
				option: '本周',
				active: false
			}, {
				id: "month",
				option: '本月',
				active: false
			}],
			selectTime: function(at) { //选择时间
				angular.forEach(this.time, function(item, index) {
					item.active = false;
				})
				at.active = true;
				angular.forEach($scope.Nsearch.group.allOf, function(item, index) {
					if(item["createdTime"]) {
						$scope.Nsearch.group.allOf.splice(index, 1);
					}
				})

				if(at.id != "none") {
					var oneDayLong = 24 * 60 * 60 * 1000;
					var now = new Date();
					var nowTime = now.getTime();
					var createdTime = {};
					if(at.id == "today") {
						var nextTime = nowTime + oneDayLong;
						var nextDay = new Date(nextTime);

						var tommorow = nextDay.format('yyyy-MM-dd');
						var today = now.format('yyyy-MM-dd'); //获取当前日期
						createdTime = {
							"createdTime": {
								"BTW": [today + "T00:00:00Z", tommorow + "T00:00:00Z"]
							}
						}
					} else if(at.id == "week") {
						var day = now.getDay();
						var MondayTime = nowTime - (day - 1) * oneDayLong;
						var SundayTime = nowTime + (7 - day) * oneDayLong;
						var monday = new Date(MondayTime);
						var sunday = new Date(SundayTime);

						createdTime = {
							"createdTime": {
								"BTW": [monday.format("yyyy-MM-dd") + "T00:00:00Z", sunday.format("yyyy-MM-dd") + "T23:59:59Z"]
							}
						}
					} else if(at.id == "month") {
						var firstDay = $scope.getCurrentMonthFirst();
						var lastDay = $scope.getCurrentMonthLast();

						createdTime = {
							"createdTime": {
								"BTW": [firstDay.format("yyyy-MM-dd") + "T00:00:00Z", lastDay.format("yyyy-MM-dd") + "T23:59:59Z"]
							}
						}
					}
					$scope.Nsearch.group.allOf.push(createdTime);
				}
				console.log($scope.Nsearch);
			},
			filter: [], //筛选条件（选出的条件）
			showFilter: false, // 筛选条件是否显示 
			clearFilter: function() { //清空筛选条件
				this.showFilter = false;
				this.filter.splice(0, this.filter.length);
				$scope.mytopicList.randomNum = Math.random();

				//处理condition显示
				angular.forEach($scope.condition.data, function(item, index) {
					item.selfShow = true;
				})
			},
			del: function(a) { //删除选中条件
				//如果最后一个filter 隐藏筛选
				if(this.filter.length == 1) {
					this.showFilter = !this.showFilter;
				}

				//删除当前选中 筛选
				angular.forEach(this.filter, function(item, index) {
						if(a.type == item.type) {
							$scope.condition.filter.splice(index, 1);
						}
					})
					//在条件中显示当前 筛选
				angular.forEach($scope.condition.data, function(item, index) {
					if(a.type == item.type) {
						item.selfShow = true;
					}
				})
				$scope.mytopicList.randomNum = Math.random();
			},
			sort: [{ //排序字段
				"type": "createdTime",
				"name": "创建时间",
				"mode": "ASC"
			}, {
				"type": "extraData.proposedPublishTo",
				"name": "发布渠道",
				"mode": "ASC"
			}],
			sortFunc: function(at) { //排序
				if($scope.Nsearch.orders.length == 0) {
					var temp = {};
					temp[at.type] = at.mode;
					$scope.Nsearch.orders.push(temp);
				} else { //已经有排序
					var _flag = false;
					angular.forEach($scope.Nsearch.orders, function(item, index) {
						if(item[at.type]) {
							item[at.type] = item[at.type] == "DESC" ? "ASC" : "DESC";
							_flag = true;
						}
					})
					if(!_flag) {
						var temp = {};
						temp[at.type] = at.mode;
						$scope.Nsearch.orders.push(temp);
					}
				}
				console.log($scope.Nsearch);
			},
			clearSort: function() { //清空排序
				$scope.Nsearch.orders.splice(0, $scope.Nsearch.orders.length);

				console.log($scope.Nsearch);
			}
		}

		//单个对象
		$scope.topicObj = {
			data: null,
			show: false
		}

		/* 列表对象 */
		$scope.mytopicList = {
			data: null,
			precondition: function(arr) {
				var result = [];
				angular.forEach(this.arr, function(item, index) {
					if(!item.selected) {
						item.selected = false;
					}
				})
			},
			loseHeight: 144, //初始值144px
			randomNum: 0,
			selectData: [],
			allSelected: false,
			load: function() { /* query */
				//				topicProxy.Topic.search($scope.Nsearch, function(resp) {
				//						console.log(resp);
				//
				//						angular.forEach(resp.items, function(item, index) {
				//							//									item.createdTime = item.createdTime.formatDate('yyyy-MM-dd hh:mm:ss');
				//							if(!item.selected) {
				//								item.selected = false;
				//							}
				//						})
				//
				//						$scope.mytopicList.data = resp.items;
				//					})
				$http.get("json/myTopic-item.json")
					.success(function(resp) {
						if(resp.data.length > 0) {
							angular.forEach(resp.data, function(item, index) {
								if(!item.selected) {
									item.selected = false;
								}
							})
						}
						$scope.mytopicList.data = resp.data;
					});
			},
			selected: function(at, e) {
				e.stopPropagation();
				at.selected = !at.selected;
			},
			showDetail: function(row) {
				$scope.topicObj.data = row;
				$scope.topicObj.show = true;
			},
			submit: function() { //提交
				//TODO 
				var _arr = [];
				//					angular.forEach(this.data, function(item, index){
				//						if(item.)
				//					})
				console.log("submit");
			},
			print: function() { //打印
				//TODO
				console.log("print");
				$scope.Modal.show();
			},
			allchecked: function() { //全选 
				if(!this.allSelected) {
					angular.forEach(this.data, function(item, index) {
						item.selected = true;
					})
				} else {
					angular.forEach(this.data, function(item, index) {
						item.selected = false;
					})
				}
				this.allSelected = !this.allSelected;
			}
		}

		//初始化函数
		$scope.init = function() {
			$scope.mytopicList.load();

		}

		$scope.init();
		
			/*详情页控制部分*/
		$scope.detailDownTitle = {
			detailTab: [{
				title: '选题详情',
				content: ''
			}, {
				title: '关联内容',
				content: ''
			}, {
				title: '推荐内容',
				content: ''
			}, {
				title: '流程日志',
				content: ''
			}],
			count: 0,
			detailCallBack: function(index) {
				if(index == 0) {
					this.count = 0;
				} else if(index == 1) {
					this.count = 1;
				} else if(index == 2) {
					this.count = 2;
				} else if(index == 3) {
					this.count = 3;
				} else {
					this.count = 0;
				}
			}
		};
		/*加载假数据*/
		//			$scope.detailContent = {
		//					data: null,
		//					materialData: null,
		//					recData: null,
		//					clueData: null,
		//					taskData: null,
		//					interviewData: null,
		//					load: function() {
		//						$http.get("service-topic/detail-item.json")
		//							.success(function(resp) {
		//								$scope.detailContent.data = resp.data;
		//								$scope.detailContent.materialData = resp.materialData;
		//								$scope.detailContent.recData = resp.recData;
		//								$scope.detailContent.clueData = resp.clueData;
		//								$scope.detailContent.taskData = resp.taskData;
		//								$scope.detailContent.interviewData = resp.interviewData;
		//							});
		//					}
		//
		//			};
		//			$scope.detailContent.load();
		/*tabs添加删除*/
		$scope.tabs = {
			data: ["社会", "影视", "片花"],
			delSingleTab: function(chooseItem) {
				$scope.tabs.data.splice(chooseItem, 1);
			},
			addInput: '',
			addTab: function() {
				this.data.push(this.addInput);
			},
			showFun: false,
			keyUpFun: function(event) {
				var event = event ? event : window.event;
				var keyCode = event.keyCode;
				if(keyCode == 13) {
					this.addTab();
					this.addInput = '';
					this.showFun = false;
				};

			}
		};

	}])
	.controller('selectmodalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
		$scope.data = [{
			name: "新建选题",
			imgurl: "./imgs/newTopic.jpg"
		}, {
			name: "已有选题",
			imgurl: "./imgs/listTopic.jpg"
		}];

		$scope.select = function(at) {
			angular.forEach($scope.data, function(item) {
				item.selected = false;
			})
			if(at.name == "新建选题") {

				console.log("新建选题");
				$uibModalInstance.close(at);
				//TODO 跳转到 创建选题页面
			} else {
				$uibModalInstance.close(at);
				console.log("列表页面")
					//TODO 跳转到 选题列表页面
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss();
		};
	}])
	.directive('conditionItem', [function() { //条件指令
		return {
			restrict: 'A',
			scope: {
				itemObj: "=", // 需要加载的内容
				conditionData: "=", //所有条件对象
				showFilter: "=", //控制是否显示filter
				selfShow: "=", //是否显示自身
				multiShow: "=", //是否多选
				selected: "=outSelected", //传出数据用
				outRandom: "=" //自定位(topicList)

			},
			templateUrl: './template/condition-item.html',
			controller: function($scope) {
				this.scope = $scope;
				$scope.itemAction = {
					btnText: "更多",
					expanded: false,
					multiData: [],
					/* 点击操作 */
					singleSelect: function(item, at) {

						if(!$scope.multiShow) {
							var _option = {
								"type": item.type,
								"name": item.name,
								"data": at
							}
							$scope.selected.push(_option);
							$scope.selfShow = false;
							//								$scope.showFilter = true;
							if(!$scope.showFilter) {
								$scope.showFilter = true;
							}
							$scope.itemObj.expanded = false;
							$scope.outRandom = Math.random();
							//								$scope.$apply(function() {
							//									
							//								});
						} else {
							if($scope.itemAction.multiData.length > 0) {
								var temp = {
									exsit: false,
									index: -1
								}
								angular.forEach($scope.itemAction.multiData, function(x, index) {
									if(x == at) {
										temp.exsit = true;
										temp.index = index;
									}
								})
								if(temp.exsit) {
									$scope.itemAction.multiData.splice(temp.index, 1);
								} else {
									$scope.itemAction.multiData.push(at);
								}
							} else {
								this.multiData.push(at);
							}
						}

					},
					cancel: function() {
						this.btnText = "更多";
						this.multiData = [];
						$scope.itemObj.expanded = false;
						$scope.multiShow = false;
						$scope.outRandom = Math.random();
					},
					confirm: function(item) {

						if(this.multiData.length == 0) {
							alert("您未选择任何一项");
							return;
						}
						var _option = {
							"type": item.type,
							"name": item.name,
							"data": []
						}

						_option.data = this.multiData;

						$scope.selected.push(_option);
						$scope.selfShow = false;
						if(!$scope.showFilter) {
							$scope.showFilter = true;
						}
						$scope.itemObj.expanded = false;
						//							this.expanded = false;
						$scope.outRandom = Math.random();
					},
					remove: function(at) {
						angular.forEach(this.multiData, function(item, index) {
							if(item == at) {
								$scope.itemAction.splice(index, 1);
							}
						})
					},
					/* 更多 */
					toggleMore: function() {
						if(!$scope.itemObj.expanded) {
							this.btnText = "收起";
							$scope.itemObj.expanded = true;
						} else {
							this.btnText = "更多";
							$scope.itemObj.expanded = false;
							$scope.multiShow = false;
						}
						$scope.outRandom = Math.random();
					},
					/* 多选 */
					multiSelect: function() {
						angular.forEach($scope.conditionData, function(item, index) {
							item.multi = false;
							item.expanded = false;
						})
						$scope.itemAction.multiData = [];
						$scope.multiShow = true;
						this.btnText = "收起";
						$scope.itemObj.expanded = true;
						$scope.outRandom = Math.random();
					}
				}
			},
			link: function(scope, element, attrs) {
				scope.$watch('selfShow', function(newVal, oldVal) {
					if(newVal == oldVal) {
						return;
					}
					if(!newVal) {
						//此处注意顺序问题 不可改动 先将滚动至顶部 再隐藏
						scope.itemAction.multiData = [];
						scope.multiShow = false;
						element.find("a.underline> i").addClass("element-hidden");
						element.find(".breed-box> ul> li> a.underline").removeClass("underline");
						element.find(".breed-box> ul").scrollTop(0);
						element.css("display", "none");
						//把更多按钮 恢复原状
						element.find(".action-box> a> i").removeClass("fa-angle-up");
						scope.itemAction.btnText = "更多";
					} else {
						element.css("display", "block");
					}
				})
			}
		}
	}])
	.directive('btnOption', [function() { //点击选中按钮
		return {
			restrict: 'A',
			require: '^?conditionItem',
			link: function(scope, element, attrs, conditionItemController) {
				element.on('click', function() {
					if(conditionItemController.scope.multiShow) {
						element.toggleClass("underline");
					}
				})
			}
		}
	}])
	.directive('btnCancel', [function() { //取消按钮
		return {
			restrict: 'EA',
			require: '^?conditionItem',
			link: function(scope, element, attrs, conditionItemController) {
				element.on('click', function() {
					element.parent().siblings().find('a').removeClass('underline');
				})
			}
		}
	}])
	.directive("statusShow", [function() { //状态图标 滑动展示说明
		return {
			restrict: "EA",
			scope: {
				statusNum: "="
			},
			link: function(scope, element, attrs) {
				if(scope.statusNum == 'WAITFORREVIEW') {
					element.css("background-color", "#fb9600");
					element.children(".icon-box").toggleClass("service-icon-clock");
					element.children(".status-tip").html("待审");
				} else if(scope.statusNum == "SENDBACK") {
					element.css("background-color", "#ff5733");
					element.children(".icon-box").toggleClass("service-icon-arrow-left");
					element.children(".status-tip").html("退回");
				} else if(scope.statusNum == "DRAFT") {
					element.css("background-color", "#3974ba");
					element.children(".icon-box").toggleClass("service-icon-draft")
					element.children(".status-tip").html("草稿");
				} else if(scope.statusNum == "PASS") {
					element.css("background-color", "#00aa7c");
					element.children(".icon-box").toggleClass("service-icon-ok");
					element.children(".status-tip").html("通过");
				}

				// 鼠标划入显示提示
				element.on("mouseover", function() {
					element.children(".status-tip").css("display", "block");
					element.toggleClass("show-tip").css("width", "60px");
				});

				//鼠标划出隐藏提示
				element.on("mouseout", function() {
					element.toggleClass("show-tip").css("width", "14px");
					element.children(".status-tip").css("display", "none");
				});
			}
		}
	}])
	.directive('layoutSelf', [function() { //自布局 列表容器
		return {
			restrict: 'A',
			scope: {
				fitHeight: "="
			},
			link: function(scope, element, attrs) {
				scope.$watch('fitHeight', function(newVal, oldVal) {
					if(newVal == oldVal) {
						return;
					}

					var topValue = parseInt(newVal) + 39;
					element.css({
						"position": "absolute",
						"top": topValue
					});
				})
			}
		}
	}])
	.directive('beautScroll', [function() { //美化滚动条
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
								element.niceScroll({
									cursorcolor: "#ccc", //#CC0071 光标颜色 
									cursoropacitymax: 0, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
									touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
									cursorwidth: "5px", //像素光标的宽度 
									cursorborder: "0", //     游标边框css定义 
									cursorborderradius: "5px", //以像素为光标边界半径 
									autohidemode: false //是否隐藏滚动条 
								});
			}
		}
	}]);