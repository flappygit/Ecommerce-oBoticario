'use strict';

/**
 * @ngdoc directive
 * @name dashboardApp.directive:ngConfirmClick
 * @description
 * # ngConfirmClick
 */
angular.module('dashboardApp')
  .directive('ngConfirmClick', function () {
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Esta seguro?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
          if ( window.confirm(msg) ) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  });
