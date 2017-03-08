/**
 * @author maheshk 
 */
(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath','contextRoot'];
function MenuService($http, ApiPath,contextRoot) {
  var service = this;

  
  
  service.getMenuItems = function () {
	  console.log("contextRoot", contextRoot);
	  return $http.get(ApiPath + "/Catalog/").then(function (response) {
		  return response.data;
    });
  };


}



})();
