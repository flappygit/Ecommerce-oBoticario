'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.logger
 * @description
 * # logger
 * Provider in the dashboardApp.
 */
angular.module('dashboardApp')
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
