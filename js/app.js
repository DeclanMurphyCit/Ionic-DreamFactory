var baseURL =  "http://SERVER_ADDRESS/api/v2";
var sessionToken = null;

todoApp = angular.module('starter', ['ionic'])
//Since we are using v2 of DreamFactory, you must submit the "API Key" and not the "App Name"
.constant('DSP_API_KEY','fd1*****************************************************dced6a0')
.constant('INSTANCE_URL','http://SERVER_ADDRESS/api/v2')

todoApp.run([
  '$http', 'DSP_API_KEY',
  function ($http, DSP_API_KEY) {
   $http.defaults.headers.common['X-Dreamfactory-API-Key'] = DSP_API_KEY;
  }
])

todoApp.config([
 '$httpProvider',
  function ($httpProvider) {
   $httpProvider.interceptors.push('httpInterceptor');
  }
])

todoApp.factory('httpInterceptor', function (INSTANCE_URL) {
 return {
  request: function (config) {
   // Prepend instance url before every api call
   if (config.url.indexOf('/api/v2') > -1) {
   //config.url = INSTANCE_URL + config.url;
    };
  return config;
  }
  }
})

angular.module('Login',[]).service('Login', [
  '$http', '$q', '$rootScope',
  function ($http, $q, $rootScope,DSP_API_KEY) {
    var handleResult = function (result) {
// set default header for every call
$http.defaults.headers.common['X-DreamFactory-Session-Token'] = result.data.session_token;
sessionToken = result.data.session_token;
$rootScope.user = result.data
};
// login user
this.login = function (creds) {
  var deferred = $q.defer();
  $http.post(baseURL + '/user/session',creds).then(function (result) {
    handleResult(result);
    deferred.resolve(result.data);
  }, deferred.reject);
  return deferred.promise;
};
}
])

todoApp.controller("TodoCtrl", function($scope, $ionicPlatform,$timeout,$http) {
	
    $ionicPlatform.ready(function() {
      var creds = {
        email: "account_email@email.com",
        password: "your_password"
      };
		$timeout(function() {
    //  angular.injector(['ng', 'Login']).get("Login").login(creds);
	  
	  }, 1000);
	  
	  
      $timeout(function() {
		  
		  var sToken = {
		 "X-DreamFactory-Session-Token" : sessionToken
		}
		
		  //$http.get('/mysql/_table/business/1', { 
		  // baseURL is being used so that the URL will work with Ionic Serve
         $http.get( baseURL + '/mysql/_table/business/1', sToken).then(function (result) {
		  console.log(result.data);
		 }, function (error) {
		  console.log("E: " + JSON.stringify(error));
		})

      }, 2000);
    }); 
  }
  )