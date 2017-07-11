var App = angular.module("App", ["ngResource", "ngRoute", 'ngAnimate', 'angularUUID2', 'angularFileUpload', 'ui.bootstrap']);
//var App = angular.module("App", ['angularUUID2', 'angularFileUpload', "ui.router", 'ui.bootstrap']);
/* 配置信息 */
App.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
		$routeProvider.when('/clue', {
            templateUrl: 'partials/clue.html',
            controller: 'clueController'
        }).when('/mytopic', {
			templateUrl: 'partials/myTopic.html',
			controller: 'mytopicController'
		}).when('/pendtopic', {
			templateUrl: 'partials/pendTopic.html',
			controller: 'pendTopicController'
		}).when('/libtopic', {
			templateUrl: 'partials/libTopic.html',
			controller: 'libTopicController'
		}).when('/querytopic', {
			templateUrl: 'partials/queryTopic.html',
			controller: 'queryTopicController'
		}).when('/relatedcome', {
			templateUrl: 'partials/relatedcome.html',
			controller: 'relatedcomeController'
		}).otherwise({
			redirectTo: '/'
		});
	}])
	.controller('MainController', ['$rootScope', '$scope', '$uibModal',
		function($rootScope, $scope, $uibModal) {
			
		}
	])
	.directive('elementDisable', [function(){
		return {
			restrict: "EA",
			scope: {
				isDisable: "="
			},
			link: function(scope, element, attrs){
				if(scope.isDisable != "0"){
					element.attr("disabled",true);
					element.attr("style","color:#798296");
				}
//				else{
//					element.bind("click", function(){
//						
//					})
//				}
			}
		}
	}])
