'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ArchivocursosCtrl
 * @description
 * # ArchivocursosCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ArchivocursosCtrl', function ($scope, upload, $http, $cookieStore, server) {

    $scope.caracter = ',';
    $scope.edicion = false;
    $scope.loading =false;

    $scope.uploadFile = function () {

      var file = $scope.file;
      $scope.loading =true;

      upload.uploadFile(file, server+'cursosadultos/archivos', $scope.caracter).then(function (res) {

        if (res.data.code == 200){
          $scope.error = null;
          $scope.cursos = res.data.data;
        }else{
          $scope.error = res.data.message;
        }
      }).catch(function (err) {
        console.log(err);
        $scope.error = err.statusText;
      }).finally(function () {
        $scope.loading =false;
      })
    };

    $scope.subirCambios = function () {
      var usuario=$cookieStore.get('usuario');
      var u = usuario.usuario;
      var p = usuario.clave;
      $scope.loading =true;
      $http.post(server+'cursosadultos/subirdatos', {'cursos':$scope.cursos, 'u':u, 'p':p})
        .then(function (res) {
          console.log('then');
          console.log(res);
          if (res.data.code == 200){
            $scope.error = null;
            $scope.success = 'Archivo subido con exito';
          }else{
            $scope.success = null;
            $scope.error = 'de datos';
            if (res.data.message) {
              $scope.error = res.data.message;
            }
          }
        })
        .catch(function (err) {
          console.log('catch');
          $scope.success = null;
          console.error(err);
          $scope.error = err.statusText;
        })
        .finally(function () {
          console.log('finally');
          $scope.loading =false;
        })
    }

  });
