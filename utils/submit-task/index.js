#!/usr/bin/env node
const { execSync } = require('child_process')
const ex = (c) => execSync(c, { stdio: 'inherit' })
const { v4: uuid } = require('uuid')
const genUuid = () => uuid().split('-')[0]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'task', alias: 't', type: String }])

const { task } = options

const taskBranch = `submit/${task}`
const stashBranch = `stash-${genUuid()}`
const tmpFolder = `.tmp-${genUuid()}`

//////////////////
//      MAIN
//////////////////

// check if task folder exists
ex(`ls tasks | grep ${task}`)
// check current branch is main
ex(`git rev-parse --abbrev-ref HEAD | grep main`)

ex(`mkdir ${tmpFolder}`)
ex(`cp -r tasks/${task}/** ${tmpFolder}`)
ex(`git checkout -b ${stashBranch}`)
ex(`git add -A && git commit -m "x"`)
ex(`git checkout main`)
ex(`git checkout -b ${taskBranch} || git checkout ${taskBranch}`)
ex(`rm -rf tasks/${task}/**`)
ex(`cp -r ${tmpFolder}/** tasks/${task}`)
try {
  ex(`git add -A && git commit -m "fixed"`)
  ex(`git push -f origin ${taskBranch}`)
  ex(`gh pr create --title ${task} --body ""`)
} catch (error) {
} finally {
  ex(`git checkout ${stashBranch}`)
  ex(`git reset --mixed @~1`)
  ex(`git checkout main`)
  ex(`git branch -D ${stashBranch}`)
  ex(`rm -rf ${tmpFolder}`)
}
