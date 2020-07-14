'use strict';

angular.module('KeyboardKit.NoteMethods', [])
        .factory('NoteMethods', ['NoteData', function (NoteData) {
                return {
                    notes: [],
                    randomNotes: [],
                    shuffleArray: function (array) {

                        // ref: see http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?rq=1

                        let currentIndex = array.length;
                        let temporaryValue;
                        let randomIndex;
                        // While there remain elements to shuffle...
                        while (0 !== currentIndex) {
                            // Pick a remaining element...
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex -= 1;
                            // And swap it with the current element.
                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                        }

                        return array;
                    },
                    getNotePositionAndName: function (scope, playedMidiNote) {

                        let octave = playedMidiNote.octave;
                        let octMod = 6 - octave;
                        let octPos = octMod * 14;
                        octPos = octave > 3 ? octPos : octPos + 20;

                        // just used for black keys, it's the sharp/flat
                        // status based on the key we're in
                        let inSharp = scope.keyIsSharp;
                        let icon = inSharp ? '&sharp;' : '&flat;';

                        let keyNotes = scope.keyNotes;

                        let noteSpec = {top: 0, name: '', noteString: ''};

                        if (playedMidiNote.onote === 'b') {
                            if (keyNotes['c'] === 'f') {
                                noteSpec.top = octPos - 8;
                                noteSpec.name = 'C';
                                icon = '&flat;';
                                noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                            }
                            else {
                                noteSpec.top = octPos - 6;
                                noteSpec.name = 'B';
                                noteSpec.noteString = noteSpec.name;
                            }
                        }
                        else if (playedMidiNote.onote === 'ab') {
                            noteSpec.top = inSharp ? octPos - 4 : octPos - 6;
                            noteSpec.name = inSharp ? 'A' : 'B';
                            noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                        }
                        else if (playedMidiNote.onote === 'a') {
                            noteSpec.top = octPos - 4;
                            noteSpec.name = 'A';
                            noteSpec.noteString = noteSpec.name;
                        }
                        else if (playedMidiNote.onote === 'ga') {
                            noteSpec.top = inSharp ? octPos - 2 : octPos - 4;
                            noteSpec.name = inSharp ? 'G' : 'A';
                            noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                        }
                        else if (playedMidiNote.onote === 'g') {
                            noteSpec.top = octPos - 2;
                            noteSpec.name = 'G';
                            noteSpec.noteString = noteSpec.name;
                        }
                        else if (playedMidiNote.onote === 'fg') {
                            noteSpec.top = inSharp ? octPos : octPos - 2;
                            noteSpec.name = inSharp ? 'F' : 'G';
                            noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                        }
                        else if (playedMidiNote.onote === 'f') {
                            if (keyNotes['e'] === 's') {
                                noteSpec.top = octPos + 2;
                                noteSpec.name = 'E';
                                icon = '&sharp;';
                                noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                            }
                            else {
                                noteSpec.top = octPos;
                                noteSpec.name = 'F';
                                noteSpec.noteString = noteSpec.name;
                            }
                        }
                        else if (playedMidiNote.onote === 'e') {
                            if (keyNotes['f'] === 'f') {
                                noteSpec.top = octPos;
                                noteSpec.name = 'F';
                                icon = '&flat;';
                                noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                            }
                            else {
                                noteSpec.top = octPos + 2;
                                noteSpec.name = 'E';
                                noteSpec.noteString = noteSpec.name;
                            }
                        }
                        else if (playedMidiNote.onote === 'de') {
                            noteSpec.top = inSharp ? octPos + 4 : octPos + 2;
                            noteSpec.name = inSharp ? 'D' : 'E';
                            noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                        }
                        else if (playedMidiNote.onote === 'd') {
                            noteSpec.top = octPos + 4;
                            noteSpec.name = 'D';
                            noteSpec.noteString = noteSpec.name;
                        }
                        else if (playedMidiNote.onote === 'cd') {
                            noteSpec.top = inSharp ? octPos + 6 : octPos + 4;
                            noteSpec.name = inSharp ? 'C' : 'D';
                            noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                        }
                        else if (playedMidiNote.onote === 'c') {
                            if (keyNotes['b'] === 's') {
                                noteSpec.top = octPos + 8;
                                noteSpec.name = 'B';
                                icon = '&sharp;';
                                noteSpec.noteString = noteSpec.name + '<sup>' + icon + '</sup>';
                            }
                            else {
                                noteSpec.top = octPos + 6;
                                noteSpec.name = 'C';
                                noteSpec.noteString = noteSpec.name;
                            }
                        }

                        return noteSpec;
                    },
                    getRandomUsingMinMax: function (min, max) {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    },
                    createShuffledList: function () {

                        // just getting a random note from an array of notes 
                        // wouldn't insure the user is seeing all of the notes each 
                        // time so we copy the notes array, randomize it and pop 
                        // the values off until it's empty and refill
                        this.randomNotes = this.notes.slice();

                        // shuffle the array 5 to 10 times to improve random result
                        // first get a random number from 5 to 10
                        var shuffleCount = this.getRandomUsingMinMax(5, 10);

                        // shuffle the array that many times
                        for (var i = 0; i < shuffleCount; i++) {
                            this.randomNotes = this.shuffleArray(this.randomNotes);
                        }
                    },
                    initNotes: function () {
                            this.notes = NoteData.getArrayOfNotes();
                    },

                    // gets a random note and displays it for sight reading practice
                    createNote: function (scope) {
                       

                        // if the array of notes is empty, make a new one
                        if (this.randomNotes.length === 0) {
                            this.createShuffledList();
                        }

                        // pop a note off the list to use
                        let newCurrent = this.randomNotes.pop();
                        
                        let NoteSpec = this.getNotePositionAndName(scope, newCurrent);
                        
                        
                        
                        newCurrent.top = NoteSpec.top;
                        newCurrent.name = NoteSpec.name;
                        newCurrent.noteString = NoteSpec.noteString;
                        
                        return newCurrent;

                    }
                };
            }]);