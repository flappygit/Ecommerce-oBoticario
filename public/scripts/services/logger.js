'use strict';

/**
 * @ngdoc service
 * @name ecommerceApp.logger
 * @description
 * # logger
 * Provider in the ecommerceApp.
 */
angular.module('ecommerceApp')
  .provider('logger', function () {

    var logToConsole = false;

    this.enableConsole = function(flag){
      logToConsole = flag;
    };

    this.$get = function(){
      return {
        debug: function(msg){  if(logToConsole){ console.log(msg);} }
      };
    };
  });
