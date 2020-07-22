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
                $scope.modal_title = "Keyboard Kit";
                $scope.subjects = [
                    {
                        title: 'Keyboard Kit',
                        description: 'Keyboard Kit is designed to be an educational tool for use with a piano connected to a desktop PC. It makes no musical tones, you have a piano for that. ;-)'
                    },
                    {
                        title: 'Sight Reading Practice',
                        description: 'When "Keep Score" activated, random notes will appear on the staff and a score is updated for correct notes selected on your piano.'
                    },
                    {
                        title: 'Common Chord Finder',
                        description: 'When "Key Search" is activated, pressing five or more keys on your piano will identify keys those notes belong to.  Nice for finding keys while listening.'
                    },
                    {
                        title: 'Common Chords For Keys',
                        description: 'Selecting a Key using the button above the piano will identify the most common fourteen chords for that key.'
                    },
                    {
                        title: 'Break On Middle C',
                        description: 'The staff will show which notes you\'re currently playing including the area where bass and treble keys overlap.  \"Break on Middle C\" will split those.'
                    },
                    {
                        title: 'Midi Enabled',
                        description: 'The top header bar will signal that a midi device has been detected (or disconnected).  Currently most major browsers support midi devices.'
                    },
                    {
                        title: 'Scales',
                        description: 'Selecting a Key using the button above the piano will identify the scale for that key with the starting note highlighted.'
                    },
                    {
                        title: 'Show Line Names',
                        description: 'When \Show Line Names\" is actived, it simply identifies the staff line names.'
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
