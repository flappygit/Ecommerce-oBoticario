'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.conexion
 * @description
 * # conexion
 * Factory in the dashboardApp.
 */
angular.module('dashboardApp')
  .factory('conexion', function (logger) {

    return {
      verificarRequest: function (data) {
        if (data.code === 200 ) {
          return null;
        }else {
          return data.message;
        }
      },
      verificarError: function (err) {
        if (err===null){
          logger.debug('Err es nulo');
          return 'No ha sido posible establecer la conexión';
        }else {
          logger.debug('Err');
          logger.debug(err);
          return err.data;
        }
      }
    };
  });
