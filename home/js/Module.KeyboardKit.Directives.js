'use strict';

angular.module('KeyboardKit.Directives', [])
        // click-watch attribute
        .directive('clickWatch', ['$log', '$document', function ($log, $document) {
                return {
                    link: function (scope, element, attr) {

                        var $ctrl = this;
                        scope.modal_items = ['item1', 'item2', 'item3'];

                        $ctrl.modal = angular.element(document.getElementById('modal_parent'));

                        $ctrl.modal.on('click', function (event) {
                            $ctrl.modal.toggleClass('d-none');
                        });

                        element.on('click', function (event) {
                            $ctrl.modal.toggleClass('d-none');
                        });

                        function open(event) {

                        }

                        function close() {

                        }
                    }
                };
            }])
        .controller('DialogController', ['$scope',
            function ($scope) {
                $scope.subjects = [
                    {
                        title: 'Keyboard Kit',
                        description: 25
                    },
                    {
                        title: 'Keyboard Kit',
                        description: 25
                    },
                    {
                        title: 'Keyboard Kit',
                        description: 25
                    }
                ];
            }])
        .directive('resizeDog', ['$timeout', '$window', function ($timeout, $window) {
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
        // NOT USED ATM
        .directive('eventWatcher', ['$window', '$document', function ($window, $document) {
                return {//data-event-watcher
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
        // NOT USED ATM
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
            }]);
