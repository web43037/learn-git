'use strict'

// To run AVA do this from the root dir:
//      cli-mine>ava --verbose ./tests/env-not-found.test.js

const test = require('ava')

test('cannot find .env file', t => {
    const error = t.throws(() => {
            use_dotenv()
        }, {instanceOf: Error})
    t.is(error.code, 'ENOENT')
})

function use_dotenv() {
    const dotenv = require('dotenv')
    const result = dotenv.config({path: './.envX'})
    if (result.error) {
        throw result.error
    }
}