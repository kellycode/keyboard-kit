'use strict';

// Declare app level module which depends on filters, and services
angular.module('KeyboardKit.App',
        [
            'KeyboardKit.Main',
            'KeyboardKit.NoteMethods',
            'KeyboardKit.NoteData',
            // external
            'ngAnimate',
            'ngSanitize',
            'ngCookies',
            'ui.bootstrap'
        ])
        .controller('RootController', ['$scope', '$rootScope',
            function ($scope) {
                // used by all views
                $scope.siteTitle = 'Keyboard Kit';
                $scope.viewChanged = false;
            }])
        .directive('keyboardKit', function () {
            return {
                restrict: 'A',
                templateUrl: 'page_modules/keyboardkit.main.tpl.html',
                replace: true
            };
        })
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