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
        .controller('ModalController', ['$scope',
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
            }]);
