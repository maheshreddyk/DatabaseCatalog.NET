(function(module) {
"use strict";
    var authenticationService = function($rootScope, $http, authService, sessionService,localStorage) {
        //var baseUrl ="http://localhost:8080/datadictionary/";
    	var baseUrl ="";
        var login = function(userName, password, rememberMe) {
          
            var config = {
                ignoreAuthModule: 'ignoreAuthModule',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            return $http.post('login', $.param({
                    username: userName,
                    password: password,
                    rememberme: rememberMe
                }), config)
                .then(function (response) {
                	console.log(response);
                	authService.loginConfirmed(response.data);
                	sessionService.create(response.data);
                	setLoginStatus(true);
                    $rootScope.isAuthenticated =  true;
                    return null;
                })
                .catch(function(response) {
                	$rootScope.isAuthenticated =  false;
                	setLoginStatus(false);
                	return response;
                });
        };

        var getAccount = function() {
            $rootScope.loadingAccount = true;
            $http.get('security/account')
                .then(function(response) {
                    authService.loginConfirmed(response.data);
                });
        };

        var isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                if (authorizedRoles == '*') {
                    return true;
                }
                authorizedRoles = [authorizedRoles];
            }
            var isAuthorized = false;
            angular.forEach(authorizedRoles, function(authorizedRole) {
                var authorized = (!!Session.login &&
                    sessionService.userRoles.indexOf(authorizedRole) !== -1);
                if (authorized || authorizedRole == '*') {
                    isAuthorized = true;
                }
            });
            return isAuthorized;
        };
        var logout = function() {
        	console.log("LOgout in Auth Service");
            setLoginStatus(false);
            localStorage.add('authenticationError', false);
            $rootScope.isAuthenticated =  false;
            $http.get('logout');
            sessionService.invalidate();
            authService.loginCancelled();
            //localStorage.printAll();
        };
        var setLoginStatus = function(val)
        {
        	localStorage.add('isAuthenticated', val);
        }
        
        var isLoggedIn = function () {
            return true;
          //return localStorage.get('isAuthenticated');
        }

        return {
            login: login,
            getAccount: getAccount,
            isAuthorized: isAuthorized,
            logout: logout,
            isLoggedIn: isLoggedIn,
            setLoginStatus: setLoginStatus
        }
    };
    authenticationService.$inject = ['$rootScope', '$http',  'authService', 'sessionService','localStorage'];
    module.service('authenticationService', authenticationService);

}(angular.module('common')));
