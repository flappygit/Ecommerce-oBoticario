'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.utiles
 * @description
 * # utiles
 * Factory in the dashboardApp.
 */
angular.module('dashboardApp')
  .factory('utiles', function () {


    // Public API here
    return {
      menuActivo: function (menu) {
        var clasesMenu = {inicio:'', administrar:'', actividades:'', data:''};
        clasesMenu[menu]='active';
        return clasesMenu;
      }
    };
  });
