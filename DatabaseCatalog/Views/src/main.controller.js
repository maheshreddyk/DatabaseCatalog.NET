(function(module){

	
	var mainController = function($state, $scope){
		$scope.state = $state;

  };
  
  mainController.$inject =['$state','$scope']
  module.controller('mainController', mainController);
  
//  var mainController = function(authenticationService){
//		var ctrl = this;
//		ctrl.isAuthenticated = authenticationService.isLoggedIn();
//
//};
//mainController.$inject =['authenticationService'];
//
//module.controller('mainController', mainController);
}(angular.module('app')));
