'use strict';

/**
 * @ngdoc overview
 * @name ecommerceApp
 * @description
 * # ecommerceApp
 *
 * Main module of the application.
 */
angular
  .module('ecommerceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute', 
    'ngSanitize',
    'ngTouch'
  ])
  
    .run(function($rootScope, $location, $cookieStore){
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if($cookieStore.get('conectado')){

        /// Ctrl connection cookieStores
        console.log("Conectado");
      }
    })
  })
    .config(function ($locationProvider, $routeProvider, loggerProvider) {
    loggerProvider.enableConsole(true);
    $locationProvider.hashPrefix('');
    $routeProvider

      .when('/inicio', {
        templateUrl: 'views/home.html',
        controller: 'inicioCtrl',
        controllerAs: 'inicio'
      })
      .when('/user', {
        templateUrl: 'views/user-panel.html',
        controller: 'userCtrl',
        controllerAs: 'user'
      })
      .when('/sobre-la-campana', {
        templateUrl: 'views/sobre.html',
        controller: 'pagesCtrl',
        controllerAs: 'Sobre la Campaña'
      })
      .when('/mecanica', {
        templateUrl: 'views/mecanica.html',
        controller: 'pagesCtrl',
        controllerAs: 'Mecánica'
      })
      .when('/terminos-y-condiciones', {
        templateUrl: 'views/terminos.html',
        controller: 'pagesCtrl',
        controllerAs: 'Términos y Condiciones'
      })

      .when('/perfume-Lily', {
        templateUrl: 'views/lily.html',
        controller: 'productCtrl',
        controllerAs: 'Perfume Lily'
      })
      .when('/labial-Make-B', {
        templateUrl: 'views/makeb.html',
        controller: 'productCtrl',
        controllerAs: 'Labiales Make B'
      })
      .when('/Nativa-Spa', {
        templateUrl: 'views/nativa.html',
        controller: 'productCtrl',
        controllerAs: 'Nativa SPA'
      })
      .when('/Malbec', {
        templateUrl: 'views/malbec.html',
        controller: 'productCtrl',
        controllerAs: 'Malbec'
      })
      .when('/Carrito', {
        templateUrl: 'views/carrito.html',
        controller: 'CarritoCtrl',
        controllerAs: 'Carrito de Compra'
      })
      .otherwise({
        redirectTo: '/inicio'
      });
  });




window.fbAsyncInit = function() {
    FB.init({
      appId      : '400226926995567',//'398211490530444'
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
