(function(module){
'use strict';

  var loginController = function(userService, authenticationService,  $stateParams){
    var ctrl = this;
    ctrl.username ="maheshk@us.ibm.com";
    ctrl.password ="Appy1234%";
    ctrl.rememberMe = false;
    ctrl.error = "";
    console.log("StateParams", $stateParams);
    if($stateParams.logout == "true")
	{
    	console.log("User logged out");
    	authenticationService.logout();
	}
    ctrl.login = function(){
        authenticationService.login(ctrl.username, ctrl.password, ctrl.rememberMe)
        .then(function(response){
        	if(response && response.data)
        		ctrl.error = response.data.error.message;
        });
        
    }
    
  }

loginController.$inject =['userService','authenticationService', '$stateParams'];

  module.controller('loginController', loginController);

}(angular.module('public')));
