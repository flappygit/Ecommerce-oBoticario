'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ImageupCtrl
 * @description
 * # ImageupCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ImageupCtrl', function ($scope, upload) {
    $scope.uploadImage = function () {
      var file = $scope.file;
      $scope.loading =true;

      upload.uploadFile(file, 'http://clientesnabica.com/alianza/2017/dashboard/app/server.php', '').then(function (res) {
        $scope.archivo = null;
        console.log(res);
        if (res.data.code == 200){
          $scope.error = null;
          $scope.archivo = res.data.file;
          $scope.ruta = res.data.ruta;
        }else{
          console.log();
          $scope.error = res.data.message;
        }
      }).catch(function (err) {
        console.log(err);
        $scope.error = err.statusText;
      }).finally(function () {
        $scope.loading =false;
      })
    }
  });
