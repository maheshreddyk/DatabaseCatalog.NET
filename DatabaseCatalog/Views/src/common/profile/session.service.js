(function(module) {
'use strict';

    var sessionService = function(localStorage) {

      
        var create = function(data) {
            this.id = data.id;
            this.login = data.login;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.userRoles = [];
            angular.forEach(data.authorities, function(value, key) {
                    this.push(value.name);
                },
                this.userRoles);
            localStorage.add('session', this);
            
        };

       var get = function(){
    	   return localStorage.get('session');
       };
        var invalidate = function() {
        	console.log(localStorage);
        	var model = localStorage.get('session');        	
        	model.id = null;
        	model.login = null;
        	model.firstName = null;
        	model.lastName = null;
        	model.email = null;
        	model.userRoles = null;
        	localStorage.remove('session');
        };

        return {
            create: create,
            invalidate: invalidate,
            get: get
        };
    };

    sessionService.$inject =['localStorage'];
    
    module.service('sessionService', sessionService);

}(angular.module('common')));
