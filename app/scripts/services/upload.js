'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.upload
 * @description
 * # upload
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('upload', function ($http, $q) {
    this.uploadFile = function (file, ruta, caracter) {
      var deferred = $q.defer();
      var formData = new FormData();
      formData.append("file", file);
      formData.append("caracter", caracter);
      $http.post(ruta, formData, {
        headers: {
          "Content-type":undefined
        },
        transformRequest: angular.identity //formData
      }).then(function (res) {
        deferred.resolve(res);
      }).catch(function (msg, code) {
        deferred.reject(msg);
      });
      return deferred.promise;
    };
  });
