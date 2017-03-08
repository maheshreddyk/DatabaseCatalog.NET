(function() {
"use strict";

angular.module('common', ['http-auth-interceptor-buffer'])
.constant('ApiPath', '/api')
.constant('contextRoot', '/')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
