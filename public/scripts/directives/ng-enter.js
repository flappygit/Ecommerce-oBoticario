'use strict';

/**
 * @ngdoc directive
 * @name ecommerceApp.directive:ngEnter
 * @description
 * # ngEnter
 */
angular.module('ecommerceApp').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });