(function(module){
var logoutController = function(authenticationService){
    authenticationService.logout();

}

logoutController.$inject =['authenticationService'];

  module.controller('logoutController', logoutController);
}(angular.module('public')));
