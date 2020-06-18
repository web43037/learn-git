const test = require('ava');
const fs = require('fs');

/*
 NOTES Run the test like so:
 ava --verbose tests/test-callback.js -- tests/draft-1.csv
*/

test.cb('test for 42 carriage returns', t => {
    fs.readFile(String(process.argv[2]), "utf8", (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        let count = data.toString().split('\n').length - 1;
        // console.log(`CR count: ${count}`);
        t.is(42,count);
        t.end();
    });
});

