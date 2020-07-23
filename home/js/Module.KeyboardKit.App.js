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
        .controller('RootController', ['$scope', '$rootScope',
            function ($scope, $rootScope) {
                // used by all views
                $scope.siteTitle = 'Keyboard Kit';
                $scope.viewChanged = false;

                $scope.setOrientation = function () {
                    if (screen.orientation.type === "landscape-primary") {
                        return 'landscape';
                    }
                    else if (screen.orientation.type === "portrait-primary") {
                        return 'portrait';
                    }
                };

                $(window).on("load resize orientationchange", function (event) {
                    $scope.orientation = $scope.setOrientation();
                    $scope.$apply();
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