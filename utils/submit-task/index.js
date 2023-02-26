#!/usr/bin/env node

const { execSync } = require('child_process')
const ex = (c) => execSync(c, { stdio: 'inherit' })
const ex2Str = (c) => execSync(c).toString().trim()
const task = 'js-hello-world'
const tasks_dir = '../../tasks'

ex(`${tasks_dir}/${task}`)
