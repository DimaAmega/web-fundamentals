const os = require('os')
const assert = require('assert').strict
const { execSync } = require('child_process')
const { exit } = require('process')
const ex = (c) => execSync(c, { stdio: 'inherit' })
const ex2Str = (c) => execSync(c).toString().trim()
const platform = () => os.platform()

const cmdLineFlags = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((e) => e.match(/^-{1,2}\w/))
    .map((e) => e.replace(/^-{1,2}/, ''))
    .map((e) => [e, true])
)

const REPO_FOLDER = (cmdLineFlags['inside-codespace'] && '.') || 'web-fundamentals'

const cyan = '\x1b[36m'
const reset = '\x1b[0m'
const red = '\x1b[31m'

const logWithColor = (message, color) => console.log(`${color}%s${reset}`, message)
const logHeader = (message) => logWithColor(message, cyan)
const logError = (message) => logWithColor(message, red)

const getCLIVersion = (packageName) => {
  try {
    const [major, minor, patch] = ex2Str(`${packageName}  --version`)
      .match(/\d+\.\d+\.\d+/g)[0]
      .split('.')
      .map(Number)
    return { major, minor, patch, isInstalled: true }
  } catch (error) {
    logError(`${packageName} is not installed`)
    return { major: 0, minor: 0, patch: 0, isInstalled: false }
  }
}

function installGit() {
  logError('please install git')
  exit(1)
}

function installNode() {
  const cmdSudo = 'sudo n install 19'
  ex(`(${cmdSudo.replace(/sudo/g, '')}) || (${cmdSudo})`)
  logError('please restart previous command again')
  exit(1)
}

function installPnpm() {
  const cmdSudo = 'sudo npm i -g pnpm@8.1.1'
  ex(`(${cmdSudo.replace(/sudo/g, '')}) || (${cmdSudo})`)
}

function installGh() {
  switch (platform()) {
    case 'darwin':
      ex('brew install gh')
      break
    case 'linux':
      const cmdSudo = `curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
      && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
      && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
      && sudo apt update && sudo apt install gh -y`
      ex(`(${cmdSudo.replace(/sudo/g, '')}) || (${cmdSudo})`)
      break
    default:
      throw new Error(`does not support ${platform()} platform`)
  }
}

function installCLI({ cliName, install, majorRequired }) {
  let { isInstalled, major } = getCLIVersion(cliName)
  if (!isInstalled || major !== majorRequired) {
    install()
  }
  logHeader(`${cliName}: ${ex2Str(`${cliName} --version`)}`)
}

function configGh() {
  try {
    ex('gh auth status')
  } catch (error) {
    ex('gh auth login -p https -s user -w')
    ex('gh auth status')
  }
  logHeader('gh configurated')
}

function forkAndCloneRepo() {
  if (cmdLineFlags['inside-codespace']) {
    return
  }

  try {
    ex('gh repo fork --clone DimaAmega/web-fundamentals')
  } catch (error) {}
  logHeader('repo cloned')
}

function configRepo() {
  // config unsername and email IILE
  ;(() => {
    if (cmdLineFlags['inside-codespace']) {
      // we don't need to config username and email inside codespace
      return
    }

    const { email } = JSON.parse(
      ex2Str(`gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" /user/emails`)
    ).find(({ primary }) => primary)
    const { login } = JSON.parse(ex2Str(`gh api user`))

    assert.ok(login)
    assert.ok(email)

    ex(
      `cd ${REPO_FOLDER} \
        && git config user.name "${login}" \
        && git config user.email "${email}"`
    )
  })()

  ex(
    `cd ${REPO_FOLDER} \
      && git config merge.ff only \
      && gh repo set-default DimaAmega/web-fundamentals`
  )

  logHeader('repo configured')
}

const installDeps = () => ex(`cd ${REPO_FOLDER} && pnpm install`)
const setupFrontendTools = () => ex(`cd ${REPO_FOLDER} && pnpm dlx playwright@1.32.1 install --with-deps`)

function main() {
  installCLI({ cliName: 'git', install: installGit, majorRequired: 2 })
  installCLI({ cliName: 'node', install: installNode, majorRequired: 19 })
  installCLI({ cliName: 'pnpm', install: installPnpm, majorRequired: 8 })
  installCLI({ cliName: 'gh', install: installGh, majorRequired: 2 })

  configGh()
  forkAndCloneRepo()
  configRepo()
  installDeps()
  setupFrontendTools()

  logHeader('DONE')
}
///////////////
//    MAIN
///////////////
main()
