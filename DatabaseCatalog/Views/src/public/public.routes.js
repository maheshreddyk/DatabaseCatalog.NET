(function() {
    'use strict';

    angular.module('public')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        // Routes
        $stateProvider
        .state("login",{
          url:"/login?logout",
          //url:"/login",          
          templateUrl:"src/public/login/login.html",
          controller:"loginController as loginCtrl"
          //,hideNavbar: true
        })
       
        .state("home", {
                url: "/",
                templateUrl: "src/public/public.html",
              
            })
            .state("table", {
                url: "/table",
                params: {
                    appId: "",
                    creator: "",
                    table: ""
                },
                templateUrl: "src/public/table/table.template.html",
                controller: "tableController as tableCtrl"
            })
            
        .state("admin", {
        		url: "/admin",
                templateUrl: "src/admin/admin.html"
            });
            
            
    
    }
})();
