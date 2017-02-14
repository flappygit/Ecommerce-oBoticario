'use strict';

/**
 * @ngdoc directive
 * @name dashboardApp.directive:nivel2
 * @description
 * # nivel2
 */
angular.module('dashboardApp')
  .directive('nivel2', function () {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.getContentUrl = function() {
          if (scope.nivel1) {
            return 'fragments/cms/nivel2/' + scope.nivel2 + '.html';
          }else{
            return 'fragments/cms/nivel2/default.html';
          }
        }
      },
      scope: true,
      template:
      '<div>' +
      ' <div ng-hide="!guardado" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" ng-click="CambiarAlertaGuardado(false)" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="glyphicon glyphicon-ok"></span> Sus datos se guardaron correctamente</div>' +
      ' <div ng-include="getContentUrl()"></div>' +
      '</div>',
      controller: function ($scope, $http, server, conexion, $cookieStore) {

        $scope.crear_entidad = function (nombre, entidad, enlace) {
          var usuario=$cookieStore.get('usuario');
          $scope.CambiarAlertaGuardado(false);
          $scope.$parent.loading2 = true;
          entidad.u = usuario.usuario;
          entidad.p = usuario.clave;
          switch (nombre){
            case 'calendariocertificados':
              entidad.certificado = $scope.entidad.id;
              break;
            case 'eventos':
              entidad.categoria_evento = $scope.entidad.id;
              break;
            case 'boletin_boletines':
              entidad.seccion = $scope.entidad.id;
              console.log(entidad.seccion);
              break;
          }
          $http.post(server+nombre,entidad)
            .then(function (request) {
              console.log(request);
              var error = conexion.verificarRequest(request.data);

              if (error === null) {
                $scope.$parent.error = null;
                if (enlace === 1) {
                  $scope.seleccionarEntidad($scope.entidad);
                }else if (enlace === 2) {
                  $scope.crearTablaNivel2(nombre);
                }else if (enlace === 3) {
                  //$scope.abrirEntidadN3EntidadN2('calendarios', );
                }
                $scope.CambiarAlertaGuardado(true);
              } else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading2 = false;
            });

        };

        $scope.actualizar_entidad = function (nombre, entidad) {

          var usuario=$cookieStore.get('usuario');
          $scope.CambiarAlertaGuardado(false);
          $scope.$parent.loading2 = true;
          entidad.u = usuario.usuario;
          entidad.p = usuario.clave;
          $http.put(server+nombre+'/'+entidad.id,entidad)
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);

              if (error === null) {
                $scope.$parent.error = null;
                $scope.CambiarAlertaGuardado(true);
                //$scope.seleccionarEntidad($scope.entidad);
              } else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading2 = false;
            });

        };

        $scope.eliminar_entidad = function (nombre, entidad, enlace) {

          var usuario=$cookieStore.get('usuario');
          $scope.CambiarAlertaGuardado(false);
          $scope.$parent.loading2 = true;
          $http.delete(server+nombre+'/'+entidad.id,{params:{u:usuario.usuario,p:usuario.clave}})
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);

              console.log(request);
              if (error === null) {
                $scope.$parent.error = null;
                if (enlace === 1) {
                  $scope.seleccionarEntidad($scope.entidad);
                }else if (enlace === 2) {
                  $scope.crearTablaNivel2(nombre);
                }
                $scope.crearTablaNivel2(nombre);
                $scope.CambiarAlertaGuardado(true);
              } else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading2 = false;
            });

        };

      }
    };
  });
