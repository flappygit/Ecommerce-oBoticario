'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:CmsCtrl
 * @description
 * # CmsCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('CmsCtrl', function ($scope, $http, server, conexion, $routeParams, $location, $cookieStore, utiles) {


    $scope.meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    $scope.nombreImagen = '';
    $scope.$parent.claseMenu = utiles.menuActivo('administrar');
    $scope.nombre = $routeParams.proyecto;
    $scope.proyectos = null;
    $scope.$parent.loading = true;
    $scope.valor = $scope.nombre;
    var pagina = server+'proyectos';
    if ($location.path()!='/administrar' && $location.path()!='/data' ) {
      $('body').css({
        'overflow-y':'hidden'
      });
    }

    $http.get(pagina)
      .then(function (request) {
        var error = conexion.verificarRequest(request.data);
        if (error === null){
          $scope.$parent.error = null;
          $scope.proyectos = request.data.data;
        }else {
          $scope.$parent.error = error;
        }
      })
      .catch(function (err) {
        $scope.$parent.error = conexion.verificarError(err);
      })
      .finally(function () {
        $scope.$parent.loading = false;
      });

    $scope.irA = function(){
      $location.path('/cms/'+$scope.valor);
    };

    $scope.iniciarNivel2 = function (data) {
      $scope.nivel2 = 'entidades/'+$scope.nomTabla;
      $scope.entidadNueva = true;
      $scope.CambiarAlertaGuardado(false);
      $scope.crearEntidad();
    };

    $scope.cerrarNivel1 = function () {
      $scope.cerrarNivel2();
      $scope.nivel1 = null;
      $scope.tabla = null;
    };
    $scope.cerrarNivel2 = function () {
      $scope.nivel2 = null;
      //$scope.entidad = null;
    };

    $scope.CambiarAlertaGuardado = function (valor) {
      $scope.guardado = valor;
    };



    $scope.guardar_pagina = function (pagina) {

      var usuario=$cookieStore.get('usuario');
      $scope.pGuardado = false;
      $scope.$parent.loading1 = true;
      pagina.u = usuario.usuario;
      pagina.p = usuario.clave;
      $http.put(server+'paginas/'+pagina.id+'/guardarsecciones',pagina)
        .then(function (request) {
          console.log(request);
          var error = conexion.verificarRequest(request.data);
          if (error === null) {
            $scope.pGuardado = true;
            $scope.$parent.error = null;
            //$scope.seleccionarEntidad($scope.entidad);
          } else {
            $scope.$parent.error = error;
          }
        })
        .catch(function (err) {
          $scope.$parent.error = conexion.verificarError(err);
        })
        .finally(function () {
          $scope.$parent.loading1 = false;
        });

    }
  });
