'use strict';
angular.module('KeyboardKit.Main',
        [])
        .controller('KeyboardKitController', ['$scope', 'NoteMethods', 'NoteData', '$timeout', '$document', '$cookies',
            function ($scope, NoteMethods, NoteData, $timeout, $document, $cookies) {

                $scope.correct = 0;
                $scope.bonus = 0;
                $scope.percent = 0;
                $scope.incorrect = 0;

                $scope.showHint = false;

                // upper center midi detected notification
                $scope.midiAvailable = 'NO MIDI DEVICE DETECTED';

                // midi available text color
                $scope.midiColor = 'red';

                // option checkboxes
                $scope.keepScore = true;
                $scope.breakOnMiddleC = false;
                $scope.showLineNames = false;
                $scope.useKeySearch;

                // keep track of the current key sharp/flat status
                $scope.currentSharpOrFlat = '';

                // do we want to show the
                // octave note in the not
                $scope.objLit = {
                    showHint: true
                };

                // being optomistic
                $scope.midiEnabled = true;

                // for collecting current active notes
                // for comparison with activeNotes available
                $scope.activeNotesArray = [];

                // for maintaining a list of which keys are
                // being pressed now to determine chords or key or ?
                $scope.activeKeys = {
                    'c': false,
                    'cd': false,
                    'd': false,
                    'de': false,
                    'e': false,
                    'f': false,
                    'fg': false,
                    'g': false,
                    'ga': false,
                    'a': false,
                    'ab': false,
                    'b': false
                };

                // watcher function
                $scope.keyChangeReset = function (value) {
                    // ignore null
                    if (!value) {
                        return;
                    }

                    // we don't set a default value anywhere but here
                    if (!$scope.selectedKey) {
                        $scope.selectedKey = 'C_major';
                    }

                    $cookies.put('lastKeyUsed', $scope.selectedKey);

                    // determine how to show the key signature
                    // return 's' or 'f'
                    $scope.sharpOrFlatByKey = NoteData.getSharpOrFlatByKey($scope.selectedKey);

                    // useful global for determining what to display
                    // keynotes will likely replace this
                    $scope.keyIsSharp = $scope.sharpOrFlatByKey === 's' ? true : false;

                    $scope.keyNotes = NoteData.getKeyNotes($scope.selectedKey);

                    // get a new note
                    $scope.currentMemNote = NoteMethods.createNote($scope);
                };

                // watcher function
                $scope.keySearchChanged = function (value) {
                    // set/update this cookie
                    $cookies.put('usingKeySearch', $scope.useKeySearch.toString());

                    // remove the indicators for possible keys used
                    document.querySelectorAll('.key_status').forEach(function (el) {
                        el.remove();
                    });
                };

                $scope.keepScoreChanged = function () {
                    $cookies.put('usingKeepScore', $scope.keepScore.toString());
                };

                //Break on Middle C checkbox
                $scope.breakOnMiddleCChanged = function () {
                    $cookies.put('usingBreakOnMiddleC', $scope.breakOnMiddleC.toString());
                };

                //Show Line Names Checkbox
                $scope.showLineNamesChanged = function () {
                    $cookies.put('usingShowLineNames', $scope.showLineNames.toString());
                };

                // loops through currently played notes
                // and offsets them as needed
                $scope.offsetNotes = function () {
                    let lastTop = 0;
                    let lastLeft = 0;

                    // collect all of the visible notes
                    let notes = document.getElementsByClassName("playedNotes");

                    // function to compare this notes css top value
                    let compareTops = function (a, b) {
                        return parseFloat(angular.element(a).css('top')) - (parseFloat(angular.element(b).css('top')));
                    };

                    // collect the notes into an array
                    let noteValues = Object.values(notes);

                    // sort the array of notes from the top down
                    noteValues.sort(compareTops);

                    // now step down through and arrange them as needed
                    noteValues.forEach(function (key) {

                        let thisTop = parseFloat(angular.element(key).css('top'));
                        let thisLeft = parseFloat(angular.element(key).css('left'));
                        let topDiff = thisTop - lastTop;

                        if ((topDiff === 2) && (thisLeft === lastLeft)) {
                            thisLeft += 4;
                            angular.element(key).css('left', thisLeft + '%');
                        }

                        lastTop = thisTop;
                        lastLeft = thisLeft;
                    });

                };

                // keeps a sorted array of currently active notes on the staff
                // this is called when any piano key is pressed by addPlayedNote()
                $scope.registerNotesArray = function () {

                    // reset the array
                    $scope.activeNotesArray = [];

                    // we don't care if they're sharp or flat, it's just a list
                    // of keys being pressed converted to a list of active notes
                    // $scope.activeNotesArray is an array of currently pressed
                    // keys
                    // 
                    // $scope.activeKeys is a an array all octave notes and
                    // their boolean active status
                    //
                    // if a note is active, add it to the activeNotesArray
                    for (let key in $scope.activeKeys) {
                        if ($scope.activeKeys[key]) {
                            $scope.activeNotesArray.push(key);
                        }
                    }

                    // doing an active chord reset by removing the "active"
                    // class from all "active" chord - angular isn't managing
                    // this so this method, this way is not a concern
                    document.querySelectorAll('.chords_module .alive').forEach(function (el) {
                        el.classList.remove('alive');
                    });

                    // quick method for comparing two arrays
                    let compareArrays = function (first, second) {
                        // https://stackoverflow.com/a/53675415/1236837
                        // returns true if they have equal values
                        return first.every((e) => second.includes(e)) && second.every((e) => first.includes(e));
                    };

                    // chordNotes is an object of chord names containing an
                    // array of which keys are pressed, again, we don't care
                    // if they'rew sharp or flat, just what keys are pressed
                    let chordsIDs = NoteData.chordNotes;

                    // we're looking for a chord that matches the current keys
                    // pressed so we can add the 'alive' class to it, we do this
                    // by comparing the array of current keys pressed to the
                    // array of keys for each chord
                    for (const key in chordsIDs) {
                        if (chordsIDs.hasOwnProperty(key)) {
                            if (compareArrays(chordsIDs[key], $scope.activeNotesArray)) {
                                angular.element(document.querySelector('.chords_module ' + '#' + key)).addClass('alive');
                            }
                        }
                    }

                    // compare partial array equality; if all of the items in
                    // first array are in a larger or equal length array
                    // from https://stackoverflow.com/a/45945243/1236837
                    let comparePartialArrays = function (first, second) {
                        return first.every(function (val) {
                            return second.indexOf(val) !== -1;
                        });
                    };

                    let keyNotes = NoteData.keyNotes;


                    // at least four keys need to be pressed for us to start
                    // looking for a key
                    if ($scope.useKeySearch && $scope.activeNotesArray.length > 4) {
                        // remove the indicators for possible keys used
                        document.querySelectorAll('.key_status').forEach(function (el) {
                            el.remove();
                        });

                        for (const key in keyNotes) {
                            if (keyNotes.hasOwnProperty(key)) {
                                if (comparePartialArrays($scope.activeNotesArray, keyNotes[key])) {
                                    let search = '#key_buttons ' + '.' + key;
                                    let el = document.querySelector(search);
                                    let keyButton = angular.element(el);
                                    // add the indicators for possible keys used
                                    let newEle = angular.element("<div class='key_status'></div>");
                                    keyButton.append(newEle);
                                }
                            }
                        }
                    }
                };

                $scope.addPlayedNote = function (playedMidiNote) {

                    // get a reference to the staff module html
                    let staffElement = angular.element(document.querySelector('#staff_module'));

                    let noteSpec = NoteMethods.getNotePositionAndName($scope, playedMidiNote);

                    // default left here instead of css because we're
                    // js manipulating it and want it constant
                    let left = 58.5;
                    let playedClass = 'm' + playedMidiNote.midi;
                    let playedID = 'played_' + playedMidiNote.kbnote + '_' + playedMidiNote.midi;
                    let played_html =
                            '<div class="playedNotes ' + playedClass + '" id="' + playedID + '" style="top: ' + noteSpec.top + '%; left: ' + left + '%;">' +
                            '<div class="played-note"><span>' + noteSpec.noteString + '</span></div>' +
                            '</div>';

                    staffElement.append(played_html);

                    if (!$scope.breakOnMiddleC) {
                        if (playedMidiNote.midi > 54 && playedMidiNote.midi < 66) {
                            let cloned;
                            if (playedMidiNote.midi < 60) {
                                cloned = angular.element(played_html).clone().css('top', noteSpec.top - 20 + '%');
                            }
                            else {
                                cloned = angular.element(played_html).clone().css('top', noteSpec.top + 20 + '%');
                            }
                            staffElement.append(cloned);
                        }
                    }

                    // add it to the list of active notes
                    $scope.activeKeys[playedMidiNote.onote] = true;

                    $scope.registerNotesArray();
                };


                $scope.removePlayedNote = function (playedMidiNote) {

                    // removing by class
                    var played_note_class = '.m' + playedMidiNote.midi;

                    // I'm not a fan of =>, seems unclear
                    document.querySelectorAll(played_note_class).forEach(function (el) {
                        el.remove();
                    });

                    // remove it from the list of active notes
                    $scope.activeKeys[playedMidiNote.onote] = false;
                };

                $scope.manageSightReaderScore = function (correct) {
                    if (correct) {
                        $scope.correct += 1;
                        $scope.currentMemNote = NoteMethods.createNote($scope);
                    }
                    else {
                        $scope.incorrect -= 1;
                    }
                };

                $scope.midiMessageHandler = function (m1) {

                    // 144 is piano midi key pressed signal
                    if ($scope.midiEnabled && m1.data[0] === 144) {

                        // m1.data[1] is the midi key number

                        // we use key 108 (c8) to request a score reset
                        if (m1.data[1] === 108) {
                            $scope.correct = 0;
                            $scope.bonus = 0;
                            $scope.incorrect = 0;
                            $scope.$apply();
                        }

                        // we don't change this object in any way
                        // get the note name from the midiNotes array by the key number
                        let playedMidiNote = NoteData.getMidiNote(m1.data[1]);

                        // highlite the piano key played
                        angular.element(document.querySelector('#' + playedMidiNote.kbnote)).addClass('midi-picked');

                        // stop here if the notes are out of the staff's range
                        if (playedMidiNote.midi < 31 || playedMidiNote.midi > 89) {
                            console.log("undefined note");
                            return;
                        }

                        // add the played note to the staff
                        $scope.addPlayedNote(playedMidiNote);

                        // modify the score as needed
                        if ($scope.keepScore) {
                            $scope.manageSightReaderScore($scope.currentMemNote.kbnote === playedMidiNote.kbnote);
                            $scope.$apply();
                        }
                    }

                    // remove notes on midi key release
                    // 128 is piano midi key released signal
                    else if ($scope.midiEnabled && m1.data[0] === 128) {

                        let playedMidiNote = NoteData.getMidiNote(m1.data[1]);

                        // un-highlite the piano key played
                        angular.element(document.querySelector('#' + playedMidiNote.kbnote)).removeClass('midi-picked');

                        // stop here if the notes are out of the staff's range
                        if (playedMidiNote.midi < 31 || playedMidiNote.midi > 89) {
                            console.log("undefined note");
                            return;
                        }

                        $scope.removePlayedNote(playedMidiNote);
                    }

                    // now that we're done adding/removing notes
                    // arrange them as needed
                    $scope.offsetNotes();
                };

                $scope.midi_onsuccesscallback = function (midi) {
                    if (midi && midi.inputs && midi.inputs.size > 0) {

                        var inputs = midi.inputs;
                        var iteratorInputs = inputs.values(); // returns an iterator that loops over all inputs
                        var input = iteratorInputs.next().value; // get the first input

                        $scope.midiAvailable = 'MIDI DEVICE DETECTED';
                        $scope.midiColor = 'deepskyblue';

                        for (var input of midi.inputs.values())
                        {
                            input.onmidimessage = $scope.midiMessageHandler;
                            input.onstatechange = $scope.midiStateChangedHandler;
                        }

                        ///input.onmidimessage = $scope.midiMessageHandler; // onmidimessage( event ), event.data & event.receivedTime are populated
                        //input.onstatechange = $scope.midiStateChangedHandler;
                        $scope.$apply();
                    }
                    else {
                        $scope.midiColor = 'red';
                        $scope.midiAvailable = 'MIDI NOT SUPPORTED BY THIS BROWSER OR NOT DETECTED';
                        $scope.$apply();

                        // check for a midi connection every 5 seconds
                        // to prevent user having to refresh the page
                        $timeout(function () {
                            $scope.makeMidiConnection();
                        }, 5000);
                    }
                };

                $scope.midi_onerrorcallback = function (err) {
                    console.error("AN ERROR OCCURED WHEN ACCESSING MIDI: " + err.code);
                    $scope.midiAvailable = 'AN ERROR OCCURED WHEN ACCESSING MIDI, PRESS F12';
                };

                // attemps to connect to Midi or reconnect
                // on works properly in Chrome and MSEdge ^79
                // 'On Windows, only one application can use the underlying system midi driver at a time.'
                $scope.makeMidiConnection = function () {
                    if (navigator.requestMIDIAccess) {
                        navigator.requestMIDIAccess().then($scope.midi_onsuccesscallback, $scope.midi_onerrorcallback);
                    }
                    else {
                        $scope.midiAvailable = 'MIDI NOT SUPPORTED BY THIS BROWSER';
                    }
                };

                // to notify user if midi disconnected or connected
                $scope.midiStateChangedHandler = function (MIDIConnectionEvent) {

                    $scope.midiAvailable = 'MIDI DISCONNECTED';

                    if (MIDIConnectionEvent.currentTarget.state === "disconnected") {
                        // try to reconnect
                        $scope.makeMidiConnection();
                        console.log('disc');
                    }
                    else {
                        $scope.midiAvailable = 'MIDI CONNECTED';
                    }
                };

                // this is for the web page piano keys
                $scope.handleClickedKeySelection = function (e, octave, note) {

                    let picked = note + octave;
                    let playedMidiNote = NoteData.getMidiNoteFromKeyName(picked);

                    if (playedMidiNote.midi < 31 || playedMidiNote.midi > 89) {
                        console.log("undefined note");
                        return;
                    }

                    // watch for the mouseup
                    angular.element(e.target).bind('mouseup', function (event) {
                        console.log(picked);
                        $scope.removePlayedNote(playedMidiNote);
                    });

                    // add the played note to the staff
                    $scope.addPlayedNote(playedMidiNote);

                    if ($scope.keepScore) {
                        $scope.manageSightReaderScore($scope.currentMemNote.kbnote === picked);
                    }
                };


                // call it on startup, look for cookies and set some defaults
                angular.element(document).ready(function () {
                    // get an array of note to work with only used by sight
                    // reading practice
                    NoteMethods.initNotes();

                    // see if we have any user prefs
                    let userLastKeyUsed = $cookies.get('lastKeyUsed');
                    // default key or user's last
                    $scope.selectedKey = userLastKeyUsed ? userLastKeyUsed : 'C_major';

                    // is key search checkbox active
                    let usingKeySearch = $cookies.get('usingKeySearch');
                    // default status or user's last
                    $scope.useKeySearch = usingKeySearch === 'true' ? true : false;

                    // $scope.keepScoreChanged
                    // is key search checkbox active
                    let usingKeepScore = $cookies.get('usingKeepScore');
                    // default status or user's last
                    $scope.keepScore = usingKeepScore === 'true' ? true : false;

                    let usingBreakOnMiddleC = $cookies.get('usingBreakOnMiddleC');
                    $scope.breakOnMiddleC = usingBreakOnMiddleC === 'true' ? true : false;

                    let usingShowLineNames = $cookies.get('usingShowLineNames');
                    $scope.showLineNames = usingShowLineNames === 'true' ? true : false;

                    // now that we know the prefs are set
                    $scope.makeMidiConnection();

                    // startup watchers
                    // watches for user clicking "Key Search" checkbox
                    $scope.$watch('useKeySearch', $scope.keySearchChanged);

                    // watches for selectedKey changes
                    $scope.$watch('selectedKey', $scope.keyChangeReset);

                    // watches for user clicking "Keep Score" checkbox
                    $scope.$watch('keepScore', $scope.keepScoreChanged);

                    // watches for user clicking "Break on Middle C" checkbox
                    $scope.$watch('breakOnMiddleC', $scope.breakOnMiddleCChanged);

                    // watches for user clicking "Show Line Names" checkbox
                    $scope.$watch('showLineNames', $scope.showLineNamesChanged);

                });

            }])
        .directive('staffModule', [function () {
                return{
                    restrict: 'A',
                    templateUrl: 'page_modules/staff-module.tpl.html',
                    scope: false
                };
            }
        ])
        .directive('chordsModule', [function () {
                return{
                    restrict: 'A',
                    templateUrl: 'page_modules/chords-module.tpl.html'
                };
            }
        ])
        .directive('scoreModule', [function () {
                return{
                    restrict: 'A',
                    templateUrl: 'page_modules/score-module.tpl.html',
                    scope: false
                };
            }])
        .directive('pianoModule', [function () {
                return{
                    restrict: 'A',
                    templateUrl: 'page_modules/piano-module.tpl.html',
                    scope: false
                };
            }])
        .directive('ckeysModule', [function () {
                return{
                    restrict: 'A',
                    templateUrl: 'page_modules/ckeys-module.tpl.html',
                    scope: true
                };
            }])
        .directive('midiDetectModule', [function () {
                return{
                    restrict: 'A',
                    template:
                            '<h6 style="color: {{midiColor}};" data-page-title>' +
                            '{{midiAvailable}}' +
                            '</h6>',
                    scope: false
                };
            }]);

        