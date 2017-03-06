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
    'facebook',
    'ngAria',
    "ui.bootstrap",
    "countTo"
    
  ])
  
    .run(function($rootScope, $location, $cookieStore){
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if($cookieStore.get('conectado')){

        /// Ctrl connection cookieStores
        console.log("Conectado");
      }
        if($cookieStore.get('admin')==null || !$cookieStore.get('admin')) {
            if (next.templateUrl == 'views/admin/correos.html' ||
                next.templateUrl == 'views/admin/productos.html' ||
                next.templateUrl == 'views/admin/publicaciones.html' ||
                next.templateUrl == 'views/admin/usuarios_fb.html' ||
                next.templateUrl == 'views/admin/usuarios_nl.html') {
                $location.path('/admin/login');
            }
        }
    })
  })
    .config(function ($locationProvider, $routeProvider, loggerProvider,FacebookProvider) {
        FacebookProvider.init('398211490530444');//produccion
        //FacebookProvider.init('400226926995567');//desarrollo
    loggerProvider.enableConsole(true);
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/inicio', {
        templateUrl: 'views/home.html',
        controller: 'inicioCtrl',
        controllerAs: 'inicio'
      })
      .when('/conteo-de-likes', {
        templateUrl: 'views/user-panel.html',
        controller: 'userCtrl',
        controllerAs: 'user'
      })
      .when('/sobre-cree-en-la-belleza', {
        templateUrl: 'views/sobre.html',
        controller: 'pagesCtrl',
        controllerAs: 'Sobre la Campaña'
      })
      .when('/como-ganar', {
        templateUrl: 'views/mecanica.html',
        controller: 'pagesCtrl',
        controllerAs: 'Cómo Ganar'
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
        .when('/admin/login', {
            templateUrl: 'views/admin/admin.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
        })
        .when('/admin/correos', {
            templateUrl: 'views/admin/correos.html',
            controller: 'CorreosCtrl',
            controllerAs: 'correos'
        })
        .when('/admin/productos', {
            templateUrl: 'views/admin/productos.html',
            controller: 'ProductosCtrl',
            controllerAs: 'productos'
        })
        .when('/admin/publicaciones', {
            templateUrl: 'views/admin/publicaciones.html',
            controller: 'PublicacionesCtrl',
            controllerAs: 'publicaciones'
        })
        .when('/admin/usuarios-fb', {
            templateUrl: 'views/admin/usuarios_fb.html',
            controller: 'UsuariosFbCtrl',
            controllerAs: 'usuarios_fb'
        })
        .when('/admin/usuarios-nl', {
            templateUrl: 'views/admin/usuarios_nl.html',
            controller: 'UsuariosNlCtrl',
            controllerAs: 'usuarios_nl'
        })
      .otherwise({
        redirectTo: '/inicio'
      });
  });


