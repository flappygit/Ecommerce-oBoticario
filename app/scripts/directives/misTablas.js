'use strict';

/**
 * @ngdoc directive
 * @name dashboardApp.directive:misProyectos
 * @description
 * # misProyectos
 */
angular.module('dashboardApp')
  .directive('misTablas', function () {

    return {
      restrict: 'E',

      link: function(scope, element, attrs) {
        scope.getContentUrl = function() {
          return 'fragments/cms/tablas/' + scope.nombre + '.html';
        }
      },

      template: '<div ng-include="getContentUrl()"></div>',

      controller: function ($scope, $http, server, conexion, $cookieStore) {

        $scope.subirImagen = function () {
          console.log($scope.nombreImagen);
          console.log($scope.file);
        };

        $scope.seleccionarPagina = function (pagina) {
          $scope.funcion = 'pagina';
          $scope.pag = pagina;
          $scope.$parent.loading = true;
          $scope.$parent.loading1 = true;
          $scope.pGuardado = false;
          $http.get(server+'paginas/'+pagina+'/nombre')
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);
              if (error === null){
                $scope.$parent.error = null;
                $scope.pagina = request.data.data;
              }else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading = false;
              $scope.$parent.loading1 = false;
            });

          if (pagina == 'fou' || pagina == 'clasesParticulares'){
            $scope.cambiarNivel2('paginas/'+pagina);
          }else {
            $scope.cambiarNivel1('paginas/'+pagina);
          }

          if (pagina == 'mediatecas' || pagina == 'eventos' || pagina == 'certificaTuFrances' || pagina == 'ensenaFrances' || pagina == 'viajes' || pagina == 'ninos' || pagina == 'cursosTematicos'){
            $scope.tipo = 0;
            if(pagina=='eventos'){
              pagina = 'categoriaseventos';
            }
            if(pagina=='certificaTuFrances'){
              pagina = 'certificados';
            }
            if(pagina=='ninos'){
              pagina = 'cursos';
              $scope.tipo = 1;
            }
            if(pagina=='ensenaFrances'){
              pagina = 'cursos';
              $scope.tipo = 2;
            }
            if(pagina=='cursosTematicos'){
              pagina = 'cursos';
              $scope.tipo = 3;
            }
            if(pagina=='viajes'){
              pagina = 'destinos';
            }
            $scope.entidad = null;
            $scope.nivel2= null;
            $scope.nomTabla = pagina;
            $scope.$parent.loading = true;
            $scope.tabla = null;

            $http.get(server+'tabla/'+pagina, {params:{tipo:$scope.tipo}})
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null){
                  $scope.$parent.error = null;
                  $scope.tabla = request.data.data.entidades;
                  $scope.mul = request.data.data.mul;
                }else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading = false;
              });
          }
        };
        $scope.cambiarNivel1 = function (valor) {
          $scope.cerrarNivel1();
          $scope.nivel1 = valor;
        };
        $scope.cambiarNivel2 = function (valor) {
          $scope.cerrarNivel2();
          $scope.nivel2 = valor;
        };

        //Codigo para manejo de Nivel 1
        $scope.seleccionarTabla = function (nomTabla) {
          $scope.funcion = 'tabla';
          $scope.entidad = null;
          $scope.nivel2= null;
          $scope.nivel1 = 'tabla';
          $scope.nomTabla = nomTabla;
          $scope.$parent.loading = true;
          $scope.$parent.loading1 = true;
          $scope.tabla = null;
          $http.get(server+'tabla/'+nomTabla, {params:{tipo:$scope.tipo}})
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);
              if (error === null){
                $scope.$parent.error = null;
                $scope.tabla = request.data.data.entidades;
                $scope.mul = request.data.data.mul;
              }else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading = false;
              $scope.$parent.loading1 = false;
            });
        };


        //Codigo para manejo de Nivel 2

        $scope.crearEntidad=function () {
          switch ($scope.nomTabla) {
            case 'ciudades':
              $scope.entidad = {id:0,nombre:'',telefono:'',correo_contacto:'',logo:'',terminos_condiciones:'',
                facebook:'',twitter:'',instagram:'',youtube:''};
              break;
            case 'sedes':
              $scope.entidad = {id:0,nombre:'',telefono:'',direccion:'',horarios:'',titulo_descripcion:'',
                longitud:'',latitud:'',ciudad:0};
              break;
            case 'perfiles':
              $scope.entidad = {id:0,nombre:'',imagen:'',cargo:'',descripcion:'',correo:''};
              break;
            case 'mediatecas':
              $scope.entidad = {id:0,sede:0,telefono:'',correo:'',horario:'',descripcion:'',imagen:''};
              break;
            case 'categoriaseventos':
              $scope.entidad = {id:0,nombre:'',icono:''};
              break;
            case 'eventos':
              break;
            case 'noticias':
              $scope.entidad = {id:0,nombre:'',fecha:'',descripcion_corta:'',descripcion:'',imagen:'',imagen2:'',ciudad:0};
              break;
            case 'intensidades':
              $scope.entidad = {id:0,nombre:'',horas:'',descripcion:''};
              break;
            case 'niveles':
              $scope.entidad = {id:0,nombre:'',codigo:'',descripcion:''};
              break;
            case 'certificados':
              $scope.entidad = {id:0,nombre:'',descripcion_corta:'',informacion:'', horario:'',imagen:'',imagen2:'',ciudad:0};
              break;
            case 'cursos':
              $scope.entidad = {id:0,tipo:$scope.tipo,nombre:'',descripcion_corta:'',descripcion:'', valor:'',imagen:'',frecuencia:0, link:''};
              break;
            case 'destinos':
              $scope.entidad = {id:0,nombre:'',titulo:'',descripcion:'', informacion:'',clases:'',alojamiento:'',actividades:'',fechas:'',incluye:'',imagen1:'',imagen2:'',ciudad:0};
              break;
            case 'boletin_usuarios':
              $scope.entidad = {id:0,usuario:'',correo:'',nombre:'',clave:'',rol:''};
              break;
            case 'boletin_secciones':
              $scope.entidad = {id:0,nombre:'',nivel:'',orden:'',descripcion:''};
              break;
            case 'boletin_boletines':
              $scope.entidad = {id:0,seccion:0,nombre:'',fecha:'',descripcion:'',contenido:'',imagen:'',ancho:''};
              break;
            case 'frecuencias':
              $scope.entidad = {id:0,nombre:'',descripcion:''};
              break;
            case 'calendarios':
            case 'cursosadultos':
              $scope.entidad = {id:0,descripcion:'',link:'',sede:0,subnivel:0,intensidad:0,frecuencia:0};
              break;
          }
        };
        $scope.crearEntidad2=function (tabla) {
          switch (tabla) {
            case 'calendarios':
              $scope.entidad2 = {id:0,inicio:'',fin:'',informacion:'',adultocurso:0,curso:0};
              $scope.ver = null;
              angular.forEach($scope.entidad2.horarios, function (horario) {
                horario.inicio = new Date(horario.inicio);
                horario.fin = new Date(horario.fin);
              });
              break;
          }
        };

        $scope.iniciarEntidad = function (entidad) {
          switch ($scope.nomTabla) {
            case 'ciudades':
              break;
            case 'sedes':
              $scope.entidad.ciudad = entidad.ciudad.id;
              break;
            case 'perfiles':
              $scope.entidad.ciudad = entidad.ciudad.id;
              break;
            case 'mediatecas':
              $scope.entidad.sede = entidad.sede.id;
              break;
            case 'categoriaseventos':
              $scope.v = null;
              angular.forEach($scope.entidad.eventos, function (evento) {
                evento.sede = evento.sede.id;
                evento.fecha = new Date(evento.fecha);
              });
              $scope.nuevo_evento = {id:0,nombre:'',direccion:'',valor:'',link:'',fecha:'',descripcion:'',
                imagen:'',imagen2:'',sede:0, inscripcion:false};
              break;
            case 'calendarios':
            case 'cursosadultos':
              $scope.entidad.sede = entidad.sede.id;
              $scope.entidad.subnivel = entidad.subnivel.id;
              $scope.entidad.intensidad = entidad.intensidad.id;
              $scope.entidad.frecuencia = entidad.frecuencia.id;
              $scope.v = null;
              angular.forEach($scope.entidad.calendarios, function (calendario) {
                calendario.inicio = new Date(calendario.inicio);
                calendario.fin = new Date(calendario.fin);
              });
              $scope.nuevo_calendario = {id:0,inicio:'',fin:'',informacion:'',curso:0,adultoCurso:0};
              break;
            case 'noticias':
              $scope.entidad.ciudad = entidad.ciudad.id;
              $scope.entidad.fecha = new Date(entidad.fecha);
              break;
            case 'certificados':
              $scope.entidad.ciudad = entidad.ciudad.id;
              $scope.v = null;
              $scope.nuevo_calendario = {id:0,mes:'',fecha:'',informacion:'',descripcion:''};
              break;
            case 'cursos':
              if (entidad.frecuencia.id != null) {
                $scope.entidad.frecuencia = entidad.frecuencia.id;
              }
              if (entidad.sede.id != null){
                $scope.entidad.sede = entidad.sede.id;
              }
              break;
            case 'destinos':
              $scope.entidad.ciudad = entidad.ciudad.id;
              break;
            case 'boletin_usuarios':
              break;
            case 'boletin_secciones':
              $scope.nuevo_boletin = {id:0,seccion:0,nombre:'',fecha:'',descripcion:'',contenido:'',imagen:'',ancho:''};
              break;
            case 'boletin_boletines':
              break;
            case 'frecuencias':
              break;
          }
        };
        $scope.iniciarEntidad2 = function (tabla,entidad) {

          switch (tabla) {
            case 'calendarios':

              $scope.v = null;
              entidad.inicio = new Date(entidad.inicio);
              entidad.fin = new Date(entidad.fin);
              angular.forEach(entidad.horarios, function (horario) {
                horario.inicio = new Date(horario.inicio);
                horario.fin = new Date(horario.fin);
              });
              $scope.nuevo_horario = {id: 0, inicio: '', fin: '', precio: ''};
              break;
          }
          $scope.entidad2 = entidad;
        };

        $scope.seleccionarEntidad = function (entidad) {
          $scope.nivel2 = 'entidades/'+$scope.nomTabla;
          $scope.entidadNueva = true;
          $scope.CambiarAlertaGuardado(false);
          $scope.crearEntidad();
          if (entidad!=null) {
            $scope.entidadNueva = false;
            $scope.$parent.loading2 = true;
            var url = server + $scope.nomTabla + '/' + entidad.id;
            $http.get(url)
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null) {
                  $scope.$parent.error = null;
                  $scope.entidad = request.data.data;
                  $scope.iniciarEntidad(request.data.data);
                } else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading2 = false;
              });
          }
        };
        $scope.seleccionarEntidad2 = function (tabla, entidad) {
          $scope.nivel2 = 'entidades/'+tabla;
          $scope.entidadNueva = true;
          $scope.entidad2 = null;
          $scope.CambiarAlertaGuardado(false);
          $scope.crearEntidad2(tabla);
          if (entidad!=null) {
            $scope.$parent.loading2 = true;
            $scope.entidadNueva = false;
            var url = server + tabla + '/' + entidad.id;
            $http.get(url)
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null) {
                  $scope.$parent.error = null;
                  $scope.iniciarEntidad2(tabla, request.data.data);
                  console.log($scope.entidad2);
                } else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading2 = false;
              });
          }
        };
        $scope.crearEntidadNivel1 = function () {
          $scope.nivel1 = 'entidades/'+$scope.nomTabla;
          $scope.entidadNueva = true;
          $scope.CambiarAlertaGuardado(false);
          if ($scope.entidad!=null) {
            $scope.entidadNueva = false;
          }
        };

        $scope.crearEntidadNivel3 = function(tabla, entidad){
          $scope.nomTabla = tabla;
          /*if(tabla=='certificados'){
            $scope.nomTabla = 'calendariocertificados';
          }*/

          $scope.nivel2 = 'nivel3/entidades/'+$scope.nomTabla;
          $scope.entidadNueva = true;
          $scope.CambiarAlertaGuardado(false);
          $scope.crearEntidad();
          if (entidad!=null) {
            $scope.entidadNueva = false;
            $scope.$parent.loading = true;
            var url = server + $scope.nomTabla + '/' + entidad.id;
            console.log(url);
            $http.get(url)
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null) {
                  $scope.$parent.error = null;
                  $scope.entidad = request.data.data;
                  $scope.iniciarEntidad(request.data.data);
                } else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading = false;
              });
          }
        };

        $scope.eliminarEntidad = function () {
          $scope.$parent.loading = true;
          var usuario=$cookieStore.get('usuario');
          $http.delete(server+$scope.nomTabla+'/'+$scope.entidad.id, {params:{u:usuario.usuario,p:usuario.clave}})
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);
              if (error === null){
                $scope.$parent.error = null;
                $scope.recargar();
              }else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading = false;
            });
        };

        $scope.guardarEntidad = function () {

          var usuario=$cookieStore.get('usuario');
          $scope.CambiarAlertaGuardado(false);

          $scope.$parent.loading2 = true;
          $scope.entidad.u = usuario.usuario;
          $scope.entidad.p = usuario.clave;
          if ($scope.entidadNueva){
            $http.post(server+$scope.nomTabla,$scope.entidad)
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null) {
                  $scope.$parent.error = null;
                  $scope.entidad.id = request.data.id;
                  $scope.CambiarAlertaGuardado(true);
                  $scope.recargar();
                } else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading2 = false;
              });
          }else {
            $http.put(server+$scope.nomTabla+'/'+$scope.entidad.id,$scope.entidad)
              .then(function (request) {
                var error = conexion.verificarRequest(request.data);
                if (error === null) {
                  $scope.$parent.error = null;
                  $scope.CambiarAlertaGuardado(true);
                } else {
                  $scope.$parent.error = error;
                }
              })
              .catch(function (err) {
                $scope.$parent.error = conexion.verificarError(err);
              })
              .finally(function () {
                $scope.$parent.loading2 = false;
              });
          }
        };

        $scope.recargar = function () {
          if ($scope.funcion == 'pagina'){
            $scope.seleccionarPagina($scope.pag);
          }else if ($scope.funcion == 'tabla') {
            $scope.seleccionarTabla($scope.nomTabla);
          }
        };

        $scope.abrirEntidadN3TablaN2 = function (tabla, entidad) {
          $scope.cerrarNivel1();
          $scope.crearTablaNivel1(tabla);
          $scope.crearEntidadNivel3(tabla, entidad);

        };

        $scope.abrirEntidadN3EntidadN2 = function (tabla, entidad) {
          $scope.cambiarNivel1( 'entidades/'+tabla);
          $scope.seleccionarEntidad2('calendarios',entidad);

        };

        $scope.crearTablaNivel2 = function (nombre) {
          $scope.nivel2 = 'entidades/'+nombre;
          $scope.entidad = null;
          $scope.nomTablaNivel2 = nombre;
          $scope.$parent.loading2 = true;
          $scope.crearEntidad(nombre);
          $scope.CambiarAlertaGuardado(false);
          if(nombre == 'cursosadultos'){
            nombre = 'tabla/cursosadultos';
          }
          $http.get(server+nombre)
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);
              if (error === null){
                $scope.$parent.error = null;
                if(nombre == 'tabla/cursosadultos'){
                  $scope.tabla = request.data.data.entidades;
                  $scope.mul = request.data.data.mul;
                }else{
                  $scope.tabla = request.data.data;
                }
              }else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading2 = false;
            });
        };
        $scope.crearTablaNivel1 = function (nombre) {
          $scope.nivel1 = 'entidades/'+nombre;
          $scope.entidad = null;
          $scope.nomTablaNivel1 = nombre;
          $scope.$parent.loading1 = true;
          $scope.crearEntidad(nombre);
          $scope.CambiarAlertaGuardado(false);
          if(nombre == 'cursosadultos' || nombre == 'calendarios'){
            nombre = 'tabla/cursosadultos';
          }
          $http.get(server+nombre)
            .then(function (request) {
              var error = conexion.verificarRequest(request.data);
              if (error === null){
                $scope.$parent.error = null;
                if(nombre == 'tabla/cursosadultos'){
                  $scope.tabla = request.data.data.entidades;
                  $scope.mul = request.data.data.mul;
                }else{
                  $scope.tabla = request.data.data;
                }
              }else {
                $scope.$parent.error = error;
              }
            })
            .catch(function (err) {
              $scope.$parent.error = conexion.verificarError(err);
            })
            .finally(function () {
              $scope.$parent.loading1 = false;
            });
        };
      }
    };
  });
