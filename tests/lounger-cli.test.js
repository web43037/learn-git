'use strict'

// To run AVA do this from the root dir:
//      cli-mine>ava --verbose ./tests/lounger-cli.test.js
// To get the debug output do this:
//      cli-mine>set debug=lounger-cli

// Passing test for isonline() when passing in the URL on the command line.
// ava --verbose ./tests/lounger-cli.test.js --
// https://d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix:121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b@d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix.cloudantnosqldb.appdomain.cloud

// Failing test for isonline() when passing in the URL on the command line.
// ava --verbose ./tests/lounger-cli.test.js --
// https://BAD-d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix:121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b@d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix.cloudantnosqldb.appdomain.cloud


const test = require('ava')
const cli = require('../lib/isonline').cli
const nopt = require('nopt')
const parsed = nopt({}, {}, process.argv, 2)
const dbg = require('debug')('lounger-cli')
const bad_URL='https://BAD-d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix:121422f4cbda4f4c9f73a7d969ee340d2c5a42ab88c8fb906a8685b0a3fca64b@d59adba6-26e5-40d7-920c-3c5a573f1ae6-bluemix.cloudantnosqldb.appdomain.cloud'

// this also tests that command line parsing grabs the URL
test('cloudant is open for business. Good URL from command line', t => {
    return cli(parsed.argv.remain)
        .then((result) => {
            dbg('open for business:\n%s.', JSON.stringify(result, null, 4))
            t.pass()
        })
        .catch((err) => {
            dbg('Error:', JSON.stringify(err, null, 4))
            t.fail()
        })
})

test('cloudant is NOT open for business. BAD URL arg passed to function', t => {
    return cli(bad_URL)
        .then((result) => {
            dbg('NOT open for business:\n%s.', JSON.stringify(result, null, 4))
            t.fail()
        })
        .catch((err) => {
            dbg('Error:', JSON.stringify(err, null, 4))
            t.pass()
        })
})

test('junk passed in on command line', t => {
    return cli('ragrrgar')
        .then((result) => {
            dbg('junk passed in on command line. result:\n%s.', JSON.stringify(result, null, 4))
            t.fail()
        })
        .catch((err) => {
            dbg('Error:', JSON.stringify(err, null, 4))
            t.pass()
        })
})