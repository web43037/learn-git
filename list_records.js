'use strict';
const Cloudant = require('@cloudant/cloudant');
require('dotenv').config();

const username = process.env.cloudant_username;
const password = process.env.cloudant_password;
const cloudant = Cloudant({account: username, password: password});
const people = cloudant.db.use('people');

function list_records(db) {
    db.list()
        .then((records) => {
            // console.log('\n===========\ncloudant:\n',cloudant);
            console.log('response:\n',response);
            records.forEach(record)
            return (records);
        })
        .catch((err) => {
            console.log('\n==sent==>>');
            console.log('cloudant.url:',cloudant.config.url);
            console.log('cloudant.account:',cloudant.cc._cfg.account);
            console.log('cloudant.password:',cloudant.cc._cfg.password);
            console.log('\n<<==response==');
            console.log('error.code:',err.code);
            console.log('error.message:',err.message);
            console.log('statusCode:',err.response.statusCode);
            console.log('statusMessage:',err.response.statusMessage);
            console.log('response.body:',err.response.body);
            // console.log('is_online(): error:\n',err);
            console.log(`\n===============\n${get_func_name()}: error:\n${err}`);
            return err;
        });
}

const records = list_records(people);

function get_func_name() {
    return get_func_name.caller.name;
}