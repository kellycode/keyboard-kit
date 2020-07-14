'use strict';

angular.module('KeyboardKit.NoteData', [])
        .service('NoteData', function () {
            this.allNotes = [];
            this.midiNotes = {
                // onote: a generic note type based on an octave
                // including all keys used to determine which keys, 
                // in an octave, are being pressed
                // 
                // kbnote: the onote with the octave number
                //
                // notename: used only to display the note value
                // on the staff and can change with key change
                // uses s,f,or n because that's what type uses
                // sf types are split
                //
                //type: sf (sharp or flat) is a black key, n (natural) is a white key
                //
                // xtop: object containing the location on the staff
                // for the special notes B,C,E,F it's slightly more
                // complicated and we ignore double sharps or flats

                // TODO remove type from notes since the result of type
                // are all the result of what key we're currently in


                '21': {onote: 'a', kbnote: 'a0', octave: 0, midi: 21},
                '22': {onote: 'ab', kbnote: 'ab0', octave: 0, midi: 22},
                '23': {onote: 'b', kbnote: 'b0', octave: 0, midi: 23},
                '24': {onote: 'c', kbnote: 'c1', octave: 1, midi: 24},
                '25': {onote: 'cd', kbnote: 'cd1', octave: 1, midi: 25},
                '26': {onote: 'd', kbnote: 'd1', octave: 1, midi: 26},
                '27': {onote: 'de', kbnote: 'de1', octave: 1, midi: 27},
                '28': {onote: 'e', kbnote: 'e1', octave: 1, midi: 28},
                '29': {onote: 'f', kbnote: 'f1', octave: 1, midi: 29},
                '30': {onote: 'fg', kbnote: 'fg1', octave: 1, midi: 30},

                /***************** TOP STAFF BOUNDS *************************************************/

                '31': {onote: 'g', kbnote: 'g1', octave: 1, midi: 31},
                '32': {onote: 'ga', kbnote: 'ga1', octave: 1, midi: 32},
                '33': {onote: 'a', kbnote: 'a1', octave: 1, midi: 33},
                '34': {onote: 'ab', kbnote: 'ab1', octave: 1, midi: 34},
                '35': {onote: 'b', kbnote: 'b1', octave: 1, midi: 35},
                '36': {onote: 'c', kbnote: 'c2', octave: 2, midi: 36},
                '37': {onote: 'cd', kbnote: 'cd2', octave: 2, midi: 37},
                '38': {onote: 'd', kbnote: 'd2', octave: 2, midi: 38},
                '39': {onote: 'de', kbnote: 'de2', octave: 2, midi: 39},
                '40': {onote: 'e', kbnote: 'e2', octave: 2, midi: 40},
                '41': {onote: 'f', kbnote: 'f2', octave: 2, midi: 41},
                '42': {onote: 'fg', kbnote: 'fg2', octave: 2, midi: 42},
                '43': {onote: 'g', kbnote: 'g2', octave: 2, midi: 43},
                '44': {onote: 'ga', kbnote: 'ga2', octave: 2, midi: 44},
                '45': {onote: 'a', kbnote: 'a2', octave: 2, midi: 45},
                '46': {onote: 'ab', kbnote: 'ab2', octave: 2, midi: 46},
                '47': {onote: 'b', kbnote: 'b2', octave: 2, midi: 47},
                '48': {onote: 'c', kbnote: 'c3', octave: 3, midi: 48},
                '49': {onote: 'cd', kbnote: 'cd3', octave: 3, midi: 49},
                '50': {onote: 'd', kbnote: 'd3', octave: 3, midi: 50},
                '51': {onote: 'de', kbnote: 'de3', octave: 3, midi: 51},
                '52': {onote: 'e', kbnote: 'e3', octave: 3, midi: 52},
                '53': {onote: 'f', kbnote: 'f3', octave: 3, midi: 53},
                '54': {onote: 'fg', kbnote: 'fg3', octave: 3, midi: 54},

                /***************** OVERLAP *****************************************************/

                '55': {onote: 'g', kbnote: 'g3', octave: 3, midi: 55},
                '56': {onote: 'ga', kbnote: 'ga3', octave: 3, midi: 56},
                '57': {onote: 'a', kbnote: 'a3', octave: 3, midi: 57},
                '58': {onote: 'ab', kbnote: 'ab3', octave: 3, midi: 58},
                '59': {onote: 'b', kbnote: 'b3', octave: 3, midi: 59},
                '60': {onote: 'c', kbnote: 'c4', octave: 4, midi: 60}, // middle C
                '61': {onote: 'cd', kbnote: 'cd4', octave: 4, midi: 61},
                '62': {onote: 'd', kbnote: 'd4', octave: 4, midi: 62},
                '63': {onote: 'de', kbnote: 'de4', octave: 4, midi: 63},
                '64': {onote: 'e', kbnote: 'e4', octave: 4, midi: 64},
                '65': {onote: 'f', kbnote: 'f4', octave: 4, midi: 65},

                /***************** OVERLAP *****************************************************/

                '66': {onote: 'fg', kbnote: 'fg4', octave: 4, midi: 66},
                '67': {onote: 'g', kbnote: 'g4', octave: 4, midi: 67},
                '68': {onote: 'ga', kbnote: 'ga4', octave: 4, midi: 68},
                '69': {onote: 'a', kbnote: 'a4', octave: 4, midi: 69},
                '70': {onote: 'ab', kbnote: 'ab4', octave: 4, midi: 70},
                '71': {onote: 'b', kbnote: 'b4', octave: 4, midi: 71},
                '72': {onote: 'c', kbnote: 'c5', octave: 5, midi: 72},
                '73': {onote: 'cd', kbnote: 'cd5', octave: 5, midi: 73},
                '74': {onote: 'd', kbnote: 'd5', octave: 5, midi: 74},
                '75': {onote: 'de', kbnote: 'de5', octave: 5, midi: 75},
                '76': {onote: 'e', kbnote: 'e5', octave: 5, midi: 76},
                '77': {onote: 'f', kbnote: 'f5', octave: 5, midi: 77},
                '78': {onote: 'fg', kbnote: 'fg5', octave: 5, midi: 78},
                '79': {onote: 'g', kbnote: 'g5', octave: 5, midi: 79},
                '80': {onote: 'ga', kbnote: 'ga5', octave: 5, midi: 80},
                '81': {onote: 'a', kbnote: 'a5', octave: 5, midi: 81},
                '82': {onote: 'ab', kbnote: 'ab5', octave: 5, midi: 82},
                '83': {onote: 'b', kbnote: 'b5', octave: 5, midi: 83},
                '84': {onote: 'c', kbnote: 'c6', octave: 6, midi: 84},
                '85': {onote: 'cd', kbnote: 'cd6', octave: 6, midi: 85},
                '86': {onote: 'd', kbnote: 'd6', octave: 6, midi: 86},
                '87': {onote: 'de', kbnote: 'de6', octave: 6, midi: 87},
                '88': {onote: 'e', kbnote: 'e6', octave: 6, midi: 88},
                '89': {onote: 'f', kbnote: 'f6', octave: 6, midi: 89},

                /***************** BTM STAFF BOUNDS ************************************************/

                '90': {onote: 'fg', kbnote: 'fg6', octave: 6, midi: 90},
                '91': {onote: 'g', kbnote: 'g6', octave: 6, midi: 91},
                '92': {onote: 'ga', kbnote: 'ga6', octave: 6, midi: 92},
                '93': {onote: 'a', kbnote: 'a6', octave: 6, midi: 93},
                '94': {onote: 'ab', kbnote: 'ab6', octave: 6, midi: 94},
                '95': {onote: 'b', kbnote: 'b6', octave: 6, midi: 95},
                '96': {onote: 'c', kbnote: 'c7', octave: 7, midi: 96},
                '97': {onote: 'cd', kbnote: 'cd7', octave: 7, midi: 97},
                '98': {onote: 'd', kbnote: 'd7', octave: 7, midi: 98},
                '99': {onote: 'de', kbnote: 'de7', octave: 7, midi: 99},
                '100': {onote: 'e', kbnote: 'e7', octave: 7, midi: 100},
                '101': {onote: 'f', kbnote: 'f7', octave: 7, midi: 101},
                '102': {onote: 'fg', kbnote: 'fg7', octave: 7, midi: 102},
                '103': {onote: 'g', kbnote: 'g7', octave: 7, midi: 103},
                '104': {onote: 'ga', kbnote: 'ga7', octave: 7, midi: 104},
                '105': {onote: 'a', kbnote: 'a7', octave: 7, midi: 105},
                '106': {onote: 'ab', kbnote: 'ab7', octave: 7, midi: 106},
                '107': {onote: 'b', kbnote: 'b7', octave: 7, midi: 107},
                '108': {onote: 'c', kbnote: 'c8', octave: 8, midi: 108}
            };
            this.keyMidi = {
                'a0': '21',
                'ab0': '22',
                'b0': '23',
                'c1': '24',
                'cd1': '25',
                'd1': '26',
                'de1': '27',
                'e1': '28',
                'f1': '29',
                'fg1': '30',

                /***************** TOP STAFF BOUNDS *************************************************/

                'g1': '31',
                'ga1': '32',
                'a1': '33',
                'ab1': '34',
                'b1': '35',
                'c2': '36',
                'cd2': '37',
                'd2': '38',
                'de2': '39',
                'e2': '40',
                'f2': '41',
                'fg2': '42',
                'g2': '43',
                'ga2': '44',
                'a2': '45',
                'ab2': '46',
                'b2': '47',
                'c3': '48',
                'cd3': '49',
                'd3': '50',
                'de3': '51',
                'e3': '52',
                'f3': '53',
                'fg3': '54',

                /***************** OVERLAP *****************************************************/

                'g3': '55',
                'ga3': '56',
                'a3': '57',
                'ab3': '58',
                'b3': '59',
                'c4': '60', // middle C
                'cd4': '61',
                'd4': '62',
                'de4': '63',
                'e4': '64',
                'f4': '65',

                /***************** OVERLAP *****************************************************/

                'fg4': '66',
                'g4': '67',
                'ga4': '68',
                'a4': '69',
                'ab4': '70',
                'b4': '71',
                'c5': '72',
                'cd5': '73',
                'd5': '74',
                'de5': '75',
                'e5': '76',
                'f5': '77',
                'fg5': '78',
                'g5': '79',
                'ga5': '80',
                'a5': '81',
                'ab5': '82',
                'b5': '83',
                'c6': '84',
                'cd6': '85',
                'd6': '86',
                'de6': '87',
                'e6': '88',
                'f6': '89',

                /***************** BTM STAFF BOUNDS ************************************************/

                'fg6': '90',
                'g6': '91',
                'ga6': '92',
                'a6': '93',
                'ab6': '94',
                'b6': '95',
                'c7': '96',
                'cd7': '97',
                'd7': '98',
                'de7': '99',
                'e7': '100',
                'f7': '101',
                'fg7': '102',
                'g7': '103',
                'ga7': '104',
                ' a7': '105',
                'ab7': '106',
                'b7': '107',
                'c8': '108'
            };
            this.scales = {

            };
            // used for a generic sharp or flat status
            this.getSharpOrFlatByKey = function (currentKey) {
                return this.keyData[currentKey].sf;
            };
            // transforms the sharp, flat, natural stayus of notes for a
            // particular key into boolean values for ease of use
            this.getKeyNotes = function (currentKey) {
                let kn = this.keyData[currentKey].kn;
                let keysf = this.keyData[currentKey].sf;

                let keyNotes = {

                    // these are ids for sharp images of the staff for the key
                    // signatures and making a boolean list used by ng-if to display
                    // it or not
                    ks_ta: kn['a'] === 's',
                    ks_ba: kn['a'] === 's',
                    ks_tb: kn['b'] === 's',
                    ks_bb: kn['b'] === 's',
                    ks_tc: kn['c'] === 's',
                    ks_bc: kn['c'] === 's',
                    ks_td: kn['d'] === 's',
                    ks_bd: kn['d'] === 's',
                    ks_te: kn['e'] === 's',
                    ks_be: kn['e'] === 's',
                    ks_tf: kn['f'] === 's',
                    ks_bf: kn['f'] === 's',
                    ks_tg: kn['g'] === 's',
                    ks_bg: kn['g'] === 's',

                    // these are ids for flat images of the staff for the key
                    // signatures and making a boolean list used by ng-if  to display
                    // it or not
                    kf_ta: kn['a'] === 'f',
                    kf_ba: kn['a'] === 'f',
                    kf_tb: kn['b'] === 'f',
                    kf_bb: kn['b'] === 'f',
                    kf_tc: kn['c'] === 'f',
                    kf_bc: kn['c'] === 'f',
                    kf_td: kn['d'] === 'f',
                    kf_bd: kn['d'] === 'f',
                    kf_te: kn['e'] === 'f',
                    kf_be: kn['e'] === 'f',
                    kf_tf: kn['f'] === 'f',
                    kf_bf: kn['f'] === 'f',
                    kf_tg: kn['g'] === 'f',
                    kf_bg: kn['g'] === 'f',

                    // sharp or flat status of specific notes
                    // sharps
                    as: kn['a'] === 's',
                    bs: kn['b'] === 's',
                    cs: kn['c'] === 's',
                    ds: kn['d'] === 's',
                    es: kn['e'] === 's',
                    fs: kn['f'] === 's',
                    gs: kn['g'] === 's',
                    // flats
                    af: kn['a'] === 'f',
                    bf: kn['b'] === 'f',
                    cf: kn['c'] === 'f',
                    df: kn['d'] === 'f',
                    ef: kn['e'] === 'f',
                    ff: kn['f'] === 'f',
                    gf: kn['g'] === 'f',

                    // s, f or n status of specific
                    // notes for our current key
                    'a': kn['a'],
                    'ab': keysf,
                    'b': kn['b'],
                    'c': kn['c'],
                    'cd': keysf,
                    'd': kn['d'],
                    'de': keysf,
                    'e': kn['e'],
                    'f': kn['f'],
                    'fg': keysf,
                    'g': kn['g'],
                    'ga': keysf
                };

                return keyNotes;
            };
            this.keyData = {
                // majors
                // sf = sharp or flat for key signature purposes
                // kn = notes of the key are either sharp, flat or natural
                'C_major': {sf: 's', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'n'}},
                'C_sharp_major': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 's', 'f': 's', 'g': 's', 'a': 's', 'b': 's'}},
                'D_flat_major': {sf: 'f', kn: {'c': 'n', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'f', 'a': 'f', 'b': 'f'}},
                'D_major': {sf: 's', kn: {'c': 's', 'd': 'n', 'e': 'n', 'f': 's', 'g': 'n', 'a': 'n', 'b': 'n'}},
                'D_sharp_major': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'E_flat_major': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'E_major': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 'n', 'f': 's', 'g': 's', 'a': 'n', 'b': 'n'}},
                'F_major': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'f'}},
                'F_sharp_major': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 's', 'f': 's', 'g': 's', 'a': 's', 'b': 'n'}},
                'G_flat_major': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 's', 'f': 's', 'g': 's', 'a': 's', 'b': 'n'}},
                'G_major': {sf: 's', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 's', 'g': 'n', 'a': 'n', 'b': 'n'}},
                'G_sharp_major': {sf: 'f', kn: {'c': 'n', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'A_flat_major': {sf: 'f', kn: {'c': 'n', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'A_major': {sf: 's', kn: {'c': 's', 'd': 'n', 'e': 'n', 'f': 's', 'g': 's', 'a': 'n', 'b': 'n'}},
                'A_sharp_major': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'f'}},
                'B_flat_major': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'f'}},
                'B_major': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 'n', 'f': 's', 'g': 's', 'a': 's', 'b': 'n'}},
                // minors
                'C_minor': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'C_sharp_minor': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 'n', 'f': 's', 'g': 's', 'a': 'n', 'b': 'n'}},
                'D_minor': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'f'}},
                'D_sharp_minor': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 's', 'f': 's', 'g': 's', 'a': 's', 'b': 'n'}},
                'E_flat_minor': {sf: 'f', kn: {'c': 'f', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'f', 'a': 'f', 'b': 'f'}},
                'E_minor': {sf: 's', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 's', 'g': 'n', 'a': 'n', 'b': 'n'}},
                'F_minor': {sf: 'f', kn: {'c': 'n', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'f', 'b': 'f'}},
                'F_sharp_minor': {sf: 's', kn: {'c': 's', 'd': 'n', 'e': 'n', 'f': 's', 'g': 's', 'a': 'n', 'b': 'n'}},
                'G_minor': {sf: 'f', kn: {'c': 'n', 'd': 'n', 'e': 'f', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'f'}},
                'G_sharp_minor': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 'n', 'f': 's', 'g': 's', 'a': 's', 'b': 'n'}},
                'A_flat_minor': {sf: 'f', kn: {'c': 'f', 'd': 'f', 'e': 'f', 'f': 'f', 'g': 'f', 'a': 'f', 'b': 'f'}},
                'A_minor': {sf: 's', kn: {'c': 'n', 'd': 'n', 'e': 'n', 'f': 'n', 'g': 'n', 'a': 'n', 'b': 'n'}},
                'A_sharp_minor': {sf: 's', kn: {'c': 's', 'd': 's', 'e': 's', 'f': 's', 'g': 's', 'a': 's', 'b': 's'}},
                'B_flat_minor': {sf: 'f', kn: {'c': 'n', 'd': 'f', 'e': 'f', 'f': 'n', 'g': 'f', 'a': 'f', 'b': 'f'}},
                'B_minor': {sf: 's', kn: {'c': 's', 'd': 'n', 'e': 'n', 'f': 's', 'g': 'n', 'a': 'n', 'b': 'n'}}
            };
            
            // notes that are valid for the key
            this.keyNotes = {
                // major
                'c_major': ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
                'c_sharp_major': ['cd', 'de', 'f', 'fg', 'ga', 'ab', 'c'],
                'd_flat_major': ['cd', 'de', 'f', 'fg', 'ga', 'ab', 'c'],
                'd_major': ['d', 'e', 'fg', 'g', 'a', 'b', 'cd'],
                'e_flat_major': ['de', 'f', 'g', 'ga', 'ab', 'c', 'd'],
                'e_major': ['e', 'fg', 'ga', 'a', 'b', 'cd', 'de'],      
                'f_major': ['f', 'g', 'a', 'ab', 'c', 'd', 'e'],    
                'f_sharp_major': ['fg', 'ga', 'ab', 'b', 'cd', 'de', 'f'],
                'g_major': ['g', 'a', 'b', 'c', 'd', 'e', 'fg'],
                'a_flat_major': ['ga', 'ab', 'c', 'cd', 'de', 'f', 'g'],
                'a_major': ['a', 'b', 'cd', 'd', 'e', 'fg', 'ga'],
                'b_flat_major': ['ab', 'c', 'd', 'de', 'f', 'g', 'a'],
                'b_major': ['b', 'cd', 'de', 'e', 'fg', 'ga', 'ab'],
                // minor
                'c_minor': ['c', 'd', 'de', 'f', 'g', 'ga', 'ab'],
                'c_sharp_minor': ['cd', 'de', 'e', 'fg', 'ga', 'a', 'b'],
                'd_minor': ['d', 'e', 'f', 'g', 'a', 'ab', 'c'],
                'd_sharp_minor': ['de', 'f', 'fg', 'ga', 'ab', 'b', 'cd'],
                'e_minor': ['e', 'fg', 'g', 'a', 'b', 'c', 'd'],
                'f_minor': ['f', 'g', 'ga', 'ab', 'c', 'cd', 'de'],
                'f_sharp_minor': ['fg', 'ga', 'a', 'b', 'cd', 'd', 'e'],
                'g_minor': ['g', 'a', 'ab', 'c', 'd', 'de', 'f'],
                'g_sharp_minor': ['g', 'a', 'ab', 'c', 'd', 'de', 'f'],
                'a_minor': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                'a_sharp_minor': ['ab', 'c', 'cd', 'de', 'f', 'fg', 'ga'],
                'b_flat_minor': ['ab', 'c', 'cd', 'de', 'f', 'fg', 'ga'],
                'b_minor': ['b', 'cd', 'd', 'e', 'fg', 'g', 'a']
            };
            
            // used for displaying the keys for a chord in the chord chart
            this.chordNotes = {
                'c_major': ['c', 'e', 'g'],
                'c_minor': ['c', 'de', 'g'],
                'c_minor7th': ['c', 'de', 'g', 'ab'],
                'c_diminished': ['c', 'de', 'fg'],
                'c_dominant7th': ['c', 'e', 'g', 'ab'],
                'c_major7th': ['c', 'e', 'g', 'b'],
                'c_augmented': ['c', 'e', 'ga'],
                'c_minor7thflat5': ['c', 'de', 'fg', 'ab'],

                'd_major': ['d', 'fg', 'a'],
                'd_minor': ['d', 'f', 'a'],
                'd_minor7th': ['d', 'f', 'a', 'c'],
                'd_diminished': ['d', 'f', 'ga'],
                'd_dominant7th': ['d', 'fg', 'a', 'c'],
                'd_major7th': ['d', 'fg', 'a', 'cd'],
                'd_augmented': ['d', 'fg', 'ab'],
                'd_minor7thflat5': ['d', 'f', 'ga', 'c'],

                'e_major': ['e', 'ga', 'b'],
                'e_minor': ['e', 'g', 'b'],
                'e_minor7th': ['e', 'g', 'b', 'd'],
                'e_diminished': ['e', 'g', 'ab'],
                'e_dominant7th': ['e', 'ga', 'b', 'd'],
                'e_major7th': ['e', 'ga', 'b', 'de'],
                'e_augmented': ['e', 'ga', 'c'],
                'e_minor7thflat5': ['e', 'g', 'ab', 'd'],

                'f_major': ['f', 'a', 'c'],
                'f_minor': ['f', 'ga', 'c'],
                'f_minor7th': ['f', 'ga', 'c', 'de'],
                'f_diminished': ['f', 'ga', 'b'],
                'f_dominant7th': ['f', 'a', 'c', 'de'],
                'f_major7th': ['f', 'a', 'c', 'e'],
                'f_augmented': ['f', 'a', 'cd'],
                'f_minor7thflat5': ['f', 'ga', 'b', 'de'],

                'g_major': ['g', 'b', 'd'],
                'g_minor': ['g', 'ab', 'd'],
                'g_minor7th': ['g', 'ab', 'd', 'f'],
                'g_diminished': ['g', 'ab', 'cd'],
                'g_dominant7th': ['g', 'b', 'd', 'f'],
                'g_major7th': ['g', 'b', 'd', 'fg'],
                'g_augmented': ['g', 'b', 'de'],
                'g_minor7thflat5': ['g', 'ab', 'cd', 'f'],

                'a_major': ['a', 'cd', 'e'],
                'a_minor': ['a', 'c', 'e'],
                'a_minor7th': ['a', 'c', 'e', 'g'],
                'a_diminished': ['a', 'c', 'de'],
                'a_dominant7th': ['a', 'cd', 'e', 'g'],
                'a_major7th': ['a', 'cd', 'e', 'ga'],
                'a_augmented': ['a', 'cd', 'f'],
                'a_minor7thflat5': ['a', 'c', 'de', 'g'],

                'b_major': ['b', 'de', 'fg'],
                'b_minor': ['b', 'd', 'fg'],
                'b_minor7th': ['b', 'd', 'fg', 'a'],
                'b_diminished': ['b', 'd', 'f'],
                'b_dominant7th': ['b', 'de', 'fg', 'a'],
                'b_major7th': ['b', 'de', 'fg', 'ab'],
                'b_augmented': ['b', 'de', 'g'],
                'b_minor7thflat5': ['b', 'd', 'f', 'a'],

                'cd_major': ['cd', 'f', 'ga'],
                'cd_minor': ['cd', 'e', 'ga'],
                'cd_minor7th': ['cd', 'e', 'ga', 'b'],
                'cd_diminished': ['cd', 'e', 'g'],
                'cd_dominant7th': ['cd', 'f', 'ga', 'b'],
                'cd_major7th': ['cd', 'f', 'ga', 'c'],
                'cd_augmented': ['cd', 'f', 'a'],
                'cd_minor7thflat5': ['cd', 'e', 'g', 'b'],

                'de_major': ['de', 'g', 'ab'],
                'de_minor': ['de', 'fg', 'ab'],
                'de_minor7th': ['de', 'fg', 'ab', 'cd'],
                'de_diminished': ['de', 'fg', 'a'],
                'de_dominant7th': ['de', 'g', 'ab', 'cd'],
                'de_major7th': ['de', 'g', 'ab', 'd'],
                'de_augmented': ['de', 'g', 'b'],
                'de_minor7thflat5': ['de', 'fg', 'a', 'cd'],

                'fg_major': ['fg', 'ab', 'cd'],
                'fg_minor': ['fg', 'a', 'cd'],
                'fg_minor7th': ['fg', 'a', 'cd', 'e'],
                'fg_diminished': ['fg', 'a', 'c'],
                'fg_dominant7th': ['fg', 'ab', 'cd', 'e'],
                'fg_major7th': ['fg', 'ab', 'cd', 'f'],
                'fg_augmented': ['fg', 'ab', 'd'],
                'fg_minor7thflat5': ['fg', 'a', 'c', 'e'],

                'ga_major': ['ga', 'c', 'de'],
                'ga_minor': ['ga', 'b', 'de'],
                'ga_minor7th': ['ga', 'b', 'de', 'fg'],
                'ga_diminished': ['ga', 'b', 'd'],
                'ga_dominant7th': ['ga', 'c', 'de', 'fg'],
                'ga_major7th': ['ga', 'c', 'de', 'g'],
                'ga_augmented': ['ga', 'c', 'e'],
                'ga_minor7thflat5': ['ga', 'b', 'd', 'fg'],

                'ab_major': ['ab', 'd', 'f'],
                'ab_minor': ['ab', 'cd', 'f'],
                'ab_minor7th': ['ab', 'cd', 'f', 'ga'],
                'ab_diminished': ['ab', 'cd', 'e'],
                'ab_dominant7th': ['ab', 'd', 'f', 'ga'],
                'ab_major7th': ['ab', 'd', 'f', 'a'],
                'ab_augmented': ['ab', 'd', 'fg'],
                'ab_minor7thflat5': ['ab', 'cd', 'e', 'ga']
            };
            this.getMidiNote = function (mn) {
                return this.midiNotes[mn];
            };
            this.getMidiNoteFromKeyName = function (kn) {
                return this.midiNotes[this.keyMidi[kn]];
            };
            this.getArrayOfNotes = function () {
                // we don't want to work directly with
                // a data array or object so use the
                // object array and create a new note array

                // refresh the working array of notes
                let newNotesArray = [];

                for (let key in this.midiNotes) {
                    // quick ref
                    let current = this.midiNotes[key];
                    // only within our range
                    if (current.midi > 30 && current.midi < 90) {
                        newNotesArray.push( angular.copy( current ) );
                    }
                }
                return newNotesArray;
            };
        });