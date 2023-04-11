#!/usr/bin/env node
const { execSync } = require('child_process')
const ex = (c) => execSync(c, { stdio: 'inherit' })
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'task', alias: 't', type: String }])

const { task } = options

//////////////////
//      MAIN
//////////////////

// check if task folder exists
ex(`ls tasks | grep ${task}`)

// run test
ex(`cd tasks/${task} && pnpm test`)
