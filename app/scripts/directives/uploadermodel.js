'use strict';

/**
 * @ngdoc directive
 * @name dashboardApp.directive:uploaderModel
 * @description
 * # uploaderModel
 */
angular.module('dashboardApp')
  .directive('uploaderModel', function ($parse) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on("change", function (e) {
          $parse(attrs.uploaderModel).assign(scope, element[0].files[0]);
        })
      }
    };
  });
