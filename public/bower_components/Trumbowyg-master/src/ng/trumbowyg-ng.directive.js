angular.module('dashboardApp').directive('trumbowygNg',
    function () {
        'use strict';
        return {
            transclude: true,
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
              
             var uploadOptions = {
                serverPath: 'http://clientesnabica.com/image',
                 fileFieldName: 'fileToUpload',
        data: [],                       // Additional data for ajax [{name: 'key', value: 'value'}]
        headers: {},                    // Additional headers
        xhrFields: {},                  // Additional fields
        urlPropertyName: 'file',        // How to get url from the json response (for instance 'url' for {url: ....})
        statusPropertyName: 'success',  // How to get status from the json response 
        success: undefined,             // Success callback: function (data, trumbowyg, $modal, values) {}
        error: undefined                // Error callback: function () {}
            };  
                var options = angular.extend({
                    fullscreenable: true,
                    semantic: false,
                    closable: false,
                    autogrow: true,
                     btnsDef: {
                    image: {
                        dropdown: ['insertImage', 'upload', 'base64', 'noembed'],
                        ico: 'insertImage'
                    }
                },
                    btns: [
                    ['viewHTML'],
                    ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4'],
                    ['strong', 'em', 'underline', 'del'],
                    ['superscript', 'subscript'],
                    ['createLink', 'unlink'],
                    ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['upload', 'base64', 'noembed'],
                    ['foreColor', 'backColor'],
                    ['preformatted']
                ],
                plugins: {
                    upload: uploadOptions
                }
                
                });
                

                ngModelCtrl.$render = function() {
                    angular.element(element).trumbowyg('html', ngModelCtrl.$viewValue);
                };

                angular.element(element).trumbowyg(options).on('tbwchange', function () {
                    ngModelCtrl.$setViewValue(angular.element(element).trumbowyg('html'));
                }).on('tbwpaste', function () {
                    ngModelCtrl.$setViewValue(angular.element(element).trumbowyg('html'));
                });
            }
        };
    });
