(function(module){

  var userService = function(){
    var profile = { "firstName" : "Mahesh",
                  "lastName" :"Reddt ",
                  "username" : "mahesh",
                  "password" :"",
                  "roles" :"",
                  "email" :"maheshreddydev@gmail.com"                  

                };


      var getProfile = function(){
        return profile;
      }
      var setProfile =function(user){
        profile = user;
      };
      return {
        getProfile:getProfile,
        setProfile: setProfile
      }

  };

  module.service('userService',userService);

}(angular.module('common')));
