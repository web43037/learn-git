// Cloudant credentials are available in the .env file which dotenv reads.
'use strict'
const Cloudant = require('@cloudant/cloudant')
const dbg = require('debug')('isonline')
const lounger = require('../lib/lounger.js')
let msg = ''

/*
 const cloudant = Cloudant({account: username, password: password})
 */

function isOnline(cloudant) {
    dbg('entering is_online() with typeof string: %s', typeof string)
    return new Promise((resolve, reject) => {
        cloudant.ping()
            .then((response) => {
                dbg('response from ping(): %s', JSON.stringify(response, null, 4))
                resolve(response)
            })
            .catch((err) => {
                msg = `
==sent==>>
cloudant url:${cloudant.config.url}
cloudant account:${cloudant.cc._cfg.account}
cloudant password:${cloudant.cc._cfg.password}
  
<<==response==
error code:${err.code}
error message:${err.message}
statusCode:${err.response.statusCode}
statusMessage:${err.response.statusMessage}
response body:${err.response.body}
`
                const error = new Error(msg)
                error.type = 'EUSAGE'
                reject(error)
            })
            .catch((reject) => {
                reject(reject)
            })
    })
}

exports.api = isOnline;

function cli(args) {
    return new Promise((resolve, reject) => {
        //doesNotExist()
        dbg('entering lounger.cli()')
        dbg('args:', args)
        // create the cloudant client using passed in URL or values in the .env file
        let cloudant;
        if (args) {
            if (stringIsAValidUrl(args)) {
                let objUrl = new URL(args)
                cloudant = Cloudant({
                    account: objUrl.username,
                    password: objUrl.password
                })
            } else {
                msg = `
bad input to 'isonline.' Malformed URL, bad username or password, or database name incorrect:
    '${args}'
Usage: lounger isonline [<URL>|blank]
If URL is blank, isonline reads values from the .env file.
Make sure the values are correct.
`
                const err = new Error(msg)
                err.type = 'EUSAGE'
                reject(err)
            }
        } else {
            const dotenv = require('dotenv')
            const result = dotenv.config({path: '../.env'})
            if (result.error) {
                reject(result.error)
            }
            dbg('.env values:\n' + JSON.stringify(result.parsed, null, 4))
            const username = process.env.cloudant_username
            const password = process.env.cloudant_password
            cloudant = Cloudant({account: username, password: password})
        }
        // see if cloudant is available
        isOnline(cloudant).then((response) => {
            msg = `
DATABASE IS ONLINE:
    ${JSON.stringify(response, null, 4)}
`
            dbg(msg)
            if(lounger.config.get('json')){
                console.log(msg)
            }
            resolve(msg)
        }).catch((err) => {
            msg = `
DATABASE IS *NOT* ONLINE:
    ${err}
`
            dbg(msg)
            err.message=msg
            reject(err)
        })
    })
}

exports.cli = cli

/*
 To use the debug module open a cmd window in the lib directory and enter commands
 like:
 set DEBUG=* & node isonline-synchronous-version.js
 set DEBUG=*,-cloudant:* & node isonline-synchronous-version.js
 set DEBUG=*,-nano,-cloudant:* & node isonline-synchronous-version.js
 */

const stringIsAValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};
