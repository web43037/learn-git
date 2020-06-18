const lounger = require('../lib/lounger')
const nopt = require('nopt')
const dbg = require('debug')('lounger-cli')
const log = require('npmlog')
const pkg = require('../package.json')

const parsed = nopt({
    'json': [Boolean]
}, {
    'j': '--json'
}, process.argv, 2)
const cmd = parsed.argv.remain.shift()
// dbg('cmd= ', cmd)

lounger.load(parsed)
    .then(() => {
        // dbg('lounger-cli: "then" called. Calling lounger.cli with: %s', cmd)
        // dbg('lounger.cli: %o, lounger.cli[cmd]: %o', lounger.cli,
        // lounger.cli[cmd])
        // dbg('remaining args:', parsed.argv.remain) this
        // construct calls the cmd with the command-line arguments as an array
        lounger.cli[cmd]
            .apply(null, parsed.argv.remain)
            .then((result) => {
                console.log(`call to '${cmd}' succeeded with message: ${result}`)
            })
            .catch(errorHandler)
    })
    .catch(errorHandler)


function errorHandler(err) {
    if (!err) process.exit(1)
    if (err.type === 'EUSAGE') {
        err.message && log.error(err.message)
        process.exit(1)
    }
    err.message && log.error(err.message)
    if (err.stack) {
        log.error('', err.stack)
        log.error('', '')
        log.error('', '')
        log.error('', 'lounger:', pkg.version, 'node:', process.version)
        log.error('', 'please open an issue including this log on ' + pkg.bugs.url)
    }
    process.exit(1)
}

