const test = require('ava')
const fs = require('fs')
const dbg = require('debug')('carriage-returns')

/*
 NOTES Run the test like so: ava --verbose tests/carriage-returns.test.js -- tests/draft-1.csv
 */

function num_returns() {
    return new Promise((resolve, reject) => {
            dbg('entered num_returns')
            fs.readFile(String(process.argv[2]), "utf8", (err, data) => {
                    if (err) {
                        // console.log(err)
                        dbg('err:', err)
                        reject(err)
                    } else {
                        dbg('have data OK')
                        resolve(Number(data.toString().split('\n').length - 1))
                    }
                }
            )
        }
    )
}

test('test for 42 carriage returns', t => {
    return num_returns().then(result => {
        dbg(`in then part of test. carriage returns: ${result}`)
        t.is(result, 42)
    })
})