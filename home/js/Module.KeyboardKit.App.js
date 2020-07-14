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
                    if (win.orientation) {
                        switch (win.orientation)
                        {
                            case - 90:
                            case 90:
                                return 'landscape';
                            default:
                                return 'portrait';
                        }
                    }
                    else {
                        if (win.innerHeight > win.innerWidth) {
                            return 'portrait';
                        }
                        else {
                            return 'landscape';
                        }
                    }
                };

                $scope.orientation = $scope.handleOrientation($window);

                // using the parent scope resize broadcast
                $scope.$on('eventWatcher::resize', function (broadcastEvent, args) {
                    $timeout(function () {
                        $scope.orientation = $scope.handleOrientation($window);
                    }, 0);
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
        .directive('eventWatcher', ['$window', '$document', function ($window, $document) {
                return {
                    link: function (scope) {
                        angular.element($window).on('resize', function (event, args) {
                            // namespace the event to avoid conflicts
                            scope.$broadcast('eventWatcher::resize');
                        });
                        angular.element($document).on('keydown', function (event, args) {
                            scope.$broadcast('eventWatcher::keyaction', event);
                        });
                    }
                };
            }])
        .directive('centerInParent', ['$timeout', '$window', function ($timeout, $window) {
                return{
                    restrict: 'A', // example use(as attribute) : <span>data-center-in-parent>stuff<span>
                    link: function (scope, element, attr) {
                        function centerElement() {
                            $timeout(function () {
                                var elem, parent;
                                elem = {
                                    width: element[0].clientWidth,
                                    height: element[0].clientHeight
                                };
                                parent = {
                                    width: element.parent()[0].clientWidth,
                                    height: element.parent()[0].clientHeight
                                };
                                element[0].style.top = (parent.height - elem.height) / 2 + 'px';
                                element[0].style.left = (parent.width - elem.width) / 2 + 'px';
                                element[0].style.position = 'absolute';
                            }, 0);
                        }

                        angular.element($window).on('resize', function (event, args) {
                            centerElement();
                        });

                        scope.$watch(attr.ngShow, function () {
                            centerElement();
                        });

                        centerElement();
                    }
                };
            }])
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