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
        if (next.templateUrl != 'views/login.html'){
          $location.path('/login');
        }
        /*}else{
         console.log('entoro');
         var usuario = $cookieStore.get('usuario');
         if (next.templateUrl == '_a1.html' || (usuario.puesto != 1 && next.templateUrl == '_routing1.html')){
         $rootScope.permisoDenegado = true;
         setTimeout(function () {
         $rootScope.$apply(function () {
         $rootScope.permisoDenegado = false;
         });
         }, 2000);
         $location.path('/tareas');
         }*/
      }
    })
  })
  .config(function ($locationProvider, $routeProvider, loggerProvider) {

    loggerProvider.enableConsole(true);

    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/administrar', {
        templateUrl: 'views/administrar.html',
        controller: 'AdministrarCtrl',
        controllerAs: 'administrar'
      })
      .when('/actividades', {
        templateUrl: 'views/actividades.html',
        controller: 'ActividadesCtrl',
        controllerAs: 'actividades'
      })
      .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataCtrl',
        controllerAs: 'data'
      })
      .when('/cms/:proyecto', {
        templateUrl: 'views/cms.html',
        controller: 'CmsCtrl',
        controllerAs: 'cms'
      })
      .when('/archivoCursos', {
        templateUrl: 'views/archivocursos.html',
        controller: 'ArchivocursosCtrl',
        controllerAs: 'archivoCursos'
      })
      .when('/imageUp', {
        templateUrl: 'views/imageup.html',
        controller: 'ImageupCtrl',
        controllerAs: 'imageUp'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
