(function(module) {

    var localStorage = function($window, $rootScope) {

        var store = $window.localStorage;

        angular.element($window).on('storage', function(event) {
        	console.log("here");
            if (event.key === 'isAuthenticated') {
            	console.log("here1");
              $rootScope.$apply();
            }
          });
        
        var add = function (key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        };

        var get = function(key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        };

        var remove = function(key) {
            store.removeItem(key);
        };
        
        var printAll = function(){
        	console.log("store",store);
        	for (var i = 0; i < store.length; i++){
			    console.log(store.key(i));
			}  
        }

        return {
            add: add,
            get: get,
            remove: remove,
            printAll: printAll
        }
    };
localStorage.$inject =['$window','$rootScope'];
    module.factory("localStorage", localStorage);

}(angular.module("common")));
