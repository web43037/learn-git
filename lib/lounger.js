'use strict'

const fs = require('fs')
const pkg = require('../package.json')
const dbg = require('debug')('lounger')
const path = require('path')

const lounger = {loaded: false}
lounger.version = pkg.version
const api = {}, cli = {}

Object.defineProperty(lounger, 'commands', {
    get: () => {
        if (lounger.loaded === false) {
            throw new Error('run lounger.load before')
        }
        return api
    }
})

Object.defineProperty(lounger, 'cli', {
    get() {
        if (lounger.loaded === false) {
            throw new Error('run lounger.load before')
        }
        return cli
    }
})

lounger.load = function load(opts) {
    dbg('entered into load()')
    return new Promise((resolve, reject) => {

        lounger.config={
            get: (key) =>{
                return opts[key]
            }
        }

        fs.readdir(__dirname, (err, files) => {
            if (err) reject(err)
            let cmd_name = ''
            // let mod = ''
            files.forEach((file) => {
                if (file.indexOf('.js') > 0 && file !== 'lounger.js') {
                    dbg('working with file:', file)
                    //add CLI command
                    cmd_name = path.basename(file, '.js')
                    const mod = require('./' + file)
                    if (mod.cli) {
                        cli[cmd_name] = mod.cli
                    }
                    if (mod.api) {
                        api[cmd_name] = mod.api
                    }
                    lounger.loaded = true
                    resolve(lounger)
                }
            })
        })
    })
}

module.exports = lounger