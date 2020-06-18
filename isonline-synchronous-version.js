'use strict';
const Cloudant = require('@cloudant/cloudant');
const dbg = require('debug')('isonline');
const supportsColor = require('supports-color');

const dotenv = require('dotenv');
const result = dotenv.config({path: '../.env'});
if (result.error) {
    throw result.error
}

dbg(JSON.stringify(result.parsed, null, 4));
const username = process.env.cloudant_username;
const password = process.env.cloudant_password;

const cloudant = Cloudant({account: username, password: password});

// this won't work because lounger.load() does not return a Promise
function is_online() {
// function is_online(cloudant) {
    dbg('entering is_online()');
    cloudant.ping()
        .then((response) => {
            dbg('back from ping()');
            dbg('response: %j', response);
            // dbg(JSON.stringify(response, null, 4));
            return (true);
        })
        .catch((err) => {
            dbg('==sent==>>');
            dbg('cloudant.url:', cloudant.config.url);
            dbg('cloudant.account:', cloudant.cc._cfg.account);
            dbg('cloudant.password:', cloudant.cc._cfg.password);
            dbg('<<==response==');
            dbg('error.code:', err.code);
            dbg('error.message:', err.message);
            dbg('statusCode:', err.response.statusCode);
            dbg('statusMessage:', err.response.statusMessage);
            dbg('response.body:', err.response.body);
            return err;
        });
}

/*
 To use the debug module open a cmd window in the lib directory and enter commands
 like:
 set DEBUG=* & node isonline-synchronous-version.js
 set DEBUG=*,-cloudant:* & node isonline-synchronous-version.js
 set DEBUG=*,-nano,-cloudant:* & node isonline-synchronous-version.js

 */

// is_online(cloudant);

exports.api = is_online;

function cli() {
    try {
        if (is_online() === true) return true;
    } catch (err) {
        throw err;
    }
}

exports.cli = cli;
