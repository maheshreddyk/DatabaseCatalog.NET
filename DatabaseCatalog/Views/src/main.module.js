(function() {
    "use strict";

    /**
     * Main module that includes the public module as a dependency
     */
    angular.module('app', ['public','admin'])
        .config(config);
    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');

    };

    function checkAccessOnStateChange($rootScope, $location, authenticationService,$timeout, sessionService, localStorage) {
    	$rootScope.isAuthenticated = authenticationService.isLoggedIn();
    	console.log("rootScope.authenticated", $rootScope.isAuthenticated);
    	localStorage.printAll();
        // Listen for location changes
        // This happens before route or state changes
        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
            if ($location.path() !== "/login" && !authenticationService.isLoggedIn()) {
                // Redirect to login
                $location.url('/login');
                // Prevent location change
                event.preventDefault();
            }
        });

        // Listen for route changes when using ngRoute
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            // Here we simply check if logged in but you can
            // implement more complex logic that inspects the
            // route to see if access is allowed or not
        	console.log('routeChangeStart',nextRoute, currentRoute );
            if (!authenticationService.isLoggedIn()) {
                // Redirect to login
                $location.url('/login');
                // Prevent state change
                event.preventDefault();
            }
        });

        // Listen for state changes when using ui-router
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // Here we simply check if logged in but you can
            // implement more complex logic that inspects the
            // state to see if access is allowed or not     
        	console.log('stateChangeStart',
        			toState.url, authenticationService.isLoggedIn() );
            if ((authenticationService.isLoggedIn() == null || !authenticationService.isLoggedIn()) && toState.url !== "/login") {
            	console.log("redirect to login/");
                // Redirect to login
                $location.url('/login/');
                // Prevent state change
                //event.preventDefault();
            }
        });


        // Call when the the client is confirmed
    $rootScope.$on('event:auth-loginConfirmed', function (event, data) {
        console.log('login confirmed start ' + data);
        $rootScope.loadingAccount = false;
        var nextLocation = ($rootScope.requestedUrl ? $rootScope.requestedUrl : "/home");
        var delay = ($location.path() === "/loading" ? 1500 : 0);

        $timeout(function () {
            $location.path(nextLocation).replace();
        }, delay);

    });

    // Call when the 401 response is returned by the server
    $rootScope.$on('event:auth-loginRequired', function (event, data) {
        if ($rootScope.loadingAccount && data.status !== 401) {
            $rootScope.requestedUrl = $location.path();
            $location.path('/loading');
        } else {
            sessionService.invalidate();
            authenticationService.setLoginStatus(false);
            $location.path('/login');
        }
    });

    // Call when the 403 response is returned by the server
    $rootScope.$on('event:auth-forbidden', function (rejection) {
        $rootScope.$evalAsync(function () {
            $location.path('/error/403').replace();
        });
    });

    // Call when the user logs out
    $rootScope.$on('event:auth-loginCancelled', function () {
        $location.path('/login').replace();
    });

    }

    // Inject dependencies
    checkAccessOnStateChange.$inject = ['$rootScope', '$location', 'authenticationService','$timeout', 'sessionService','localStorage'];

    angular
        .module('app')
        .run(checkAccessOnStateChange);
})();
