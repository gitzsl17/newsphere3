/* 指令文件 */
App.directive("itemDetail", [function() {
	return {
		restrict: "EA",
		scope: {
			topicId: "=",
			topicItem: "="
		},
		link: function(scope, element, attrs) {
			
		}
	}
}])