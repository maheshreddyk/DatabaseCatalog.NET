(function(module){
"use strict";

var loadingComponent =
  {
      template :'<img src="images/spinner.svg" ng-if="$ctrl.show">',
      controller: loadingController
  };



  var loadingController = function($rootScope){
     var $ctrl = this;
     var listener;

     $ctrl.$onInit = function(){
       $ctrl.show = false;
        listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
     };

     $ctrl.$onDestroy = function() {
       listener();
    };

    function onSpinnerActivate(event, data) {
      $ctrl.show = data.on;
    }
  }
  loadingController.$inject = ['$rootScope'];
  module.component('loading', loadingComponent);
}(angular.module('common')));
