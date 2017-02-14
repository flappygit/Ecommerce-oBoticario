'use strict';

/**
 * @ngdoc directive
 * @name dashboardApp.directive:nivel1
 * @description
 * # nivel1
 */
angular.module('dashboardApp')
  .directive('nivel1', function () {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.getContentUrl = function() {
          if (scope.nivel1) {
            return 'fragments/cms/nivel1/' + scope.nivel1 + '.html';
          }else{
            return 'fragments/cms/nivel1/default.html';
          }
        }
      },
      template: '<div ng-include="getContentUrl()"></div>',
      controller: function ($scope, $http, server, conexion) {


      }
    };
  });
