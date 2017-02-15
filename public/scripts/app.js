'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .run(function($rootScope, $location, $cookieStore){
    $rootScope.permisoDenegado = false;
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if($cookieStore.get('conectado')==null || !$cookieStore.get('conectado')){
        
      }
    })
  })
  .config(function ($locationProvider, $routeProvider, loggerProvider) {

    loggerProvider.enableConsole(true);

    $locationProvider.hashPrefix('');
    $routeProvider

      .when('/index', {
        templateUrl: 'index.html',
        controller: 'indexCtrl',
        controllerAs: 'index'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'userCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

window.fbAsyncInit = function() {
    FB.init({
      appId      : '398211490530444',
      status: true, 
      cookie: true, 
      xfbml: true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
