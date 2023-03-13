#!/usr/bin/env node
const { execSync } = require('child_process')
const ex2Str = (c) => execSync(c).toString().trim()

const cyan = '\x1b[36m'
const reset = '\x1b[0m'

const logWithColor = (message, color) => console.log(`${color}%s${reset}`, message)
const logHeader = (message) => logWithColor(message, cyan)
const printCLIVersion = (cliName) => logHeader(`${cliName}: ${ex2Str(`${cliName} --version`)}`)
const printPlatform = () => logHeader(ex2Str('uname -a'))

///////////////
//    MAIN
///////////////
printPlatform()
printCLIVersion('git')
printCLIVersion('node')
printCLIVersion('pnpm')
printCLIVersion('gh')
