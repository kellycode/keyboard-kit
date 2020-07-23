'use strict';

angular.module('KeyboardKit.Directives', [])
        // click-watch attribute for the modal dialog trigger
        .directive('clickWatch', ['$document', function ($document) {
                return {
                    link: function (scope, element, attr) {
                        var $ctrl = this;

                        $ctrl.modal = angular.element(document.getElementById('modal_parent'));
                        // modal includes the background full screen
                        // blocker so clicking anywhere closes the modal
                        $ctrl.modal.on('click', function (event) {
                            $ctrl.modal.toggleClass('d-none');
                        });
                        // element is the item clicked
                        element.on('click', function (event) {
                            $ctrl.modal.toggleClass('d-none');
                        });
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
            }]);
