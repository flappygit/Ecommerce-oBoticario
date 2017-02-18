'use strict';

/**
 * @ngdoc service
 * @name ecommerceApp.conexion
 * @description
 * # conexion
 * Factory in the ecommerceApp.
 */
angular.module('ecommerceApp')
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
