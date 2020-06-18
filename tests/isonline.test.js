'use strict'

// To run AVA do this from the root dir:
//      cli-mine>ava --verbose ./tests/isonline.test.js
// To run AVA with all the debug output do this:
//      cli-mine>set debug=isonline && ava --verbose ./tests/isonline.test.js

const api = require('../lib/isonline').api
const cli = require('../lib/isonline').cli
const Cloudant = require('@cloudant/cloudant')
const dbg = require('debug')('isonline')
const supportsColor = require('supports-color')
const test = require('ava')

const dotenv = require('dotenv')
const result = dotenv.config({path: './.env'})
if (result.error) {
    throw result.error
}

dbg('.env values:\n' + JSON.stringify(result.parsed, null, 4))
const username = process.env.cloudant_username
const password = process.env.cloudant_password

const cloudant = Cloudant({account: username, password: password})
const cloudant_fail = Cloudant({account: username, password: password + 'X'})
dbg('cloudant url=', cloudant.config.url)

test('cloudant is open for business. user/password from .env', t => {
    return api(cloudant)
        .then((result) => {
            dbg('open for business:\n%s.', JSON.stringify(result, null, 4))
            t.is(result.couchdb, 'Welcome')
        })
        .catch((err) => {
            dbg('Error:', err)
            t.fail(err)
        })
})

test('cloudant is closed for business. bad user/password from .env', t => {
    return api(cloudant_fail)
        .then((result) => {
            dbg('open for business:\n%s.', JSON.stringify(result, null, 4))
            t.fail(result)
        })
        .catch((err) => {
            dbg('Error:', err)
            t.pass(err)
        })
})

