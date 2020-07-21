'use strict';

// Declare app level module which depends on filters, and services
angular.module('KeyboardKit.App',
        [
            'KeyboardKit.Main',
            'KeyboardKit.NoteMethods',
            'KeyboardKit.NoteData',
            'KeyboardKit.Directives',
            // external
            'ngAnimate',
            'ngSanitize',
            'ngCookies',
            'ui.bootstrap'
        ])
        .controller('RootController', ['$scope', '$rootScope', '$window', '$timeout',
            function ($scope, $rootScope, $window, $timeout) {
                // used by all views
                $rootScope.siteTitle = 'Keyboard Kit';
                $rootScope.viewChanged = false;

                $scope.handleOrientation = function (win) {
                    if (window.orientation === 0)
                    {
                        return 'portrait';
                    }
                    else
                    {
                        return 'landscape';
                    }
                };

                angular.element($window).on('orientationchange', function (event, args) {
                    $scope.orientation = $scope.handleOrientation($window);
                });

                angular.element($window).on('load', function (event, args) {
                    $scope.orientation = $scope.handleOrientation($window);
                });

            }])
        .directive('headerModule', function () {
            return {
                restrict: 'A',
                templateUrl: 'page_modules/header-module.tpl.html',
                replace: true
            };
        })
        .directive('keyboardKit', function () {
            return {
                restrict: 'A',
                templateUrl: 'page_modules/keyboardkit.main.tpl.html',
                replace: true
            };
        })
        .directive('appVersion', ['sightReaderConfig', function (sightReaderConfig) {
                return {
                    restrict: 'A',
                    template: '<span class="srVersion">' + sightReaderConfig.name + ' v: ' + sightReaderConfig.version + '</span>',
                    replace: true
                };
            }])
        .constant("sightReaderConfig", {
            name: "Keyboard Kit",
            // get how many weeks have passed since work started
            version: (function () {
                var mil = new Date() - new Date("3/26/2020");
                var weeks = Math.abs(mil) / (7 * 24 * 60 * 60 * 1000);
                var rnd = parseInt(weeks * 10) / 10;
                return '0.' + rnd;
            }())
        });